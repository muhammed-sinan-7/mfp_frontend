import React, { useMemo, useState } from "react"; // Combined imports
import {
  Eye,
  BarChart3,
  Heart,
  Users,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Youtube,
  Image as ImageIcon, // 1. Rename the import here
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  PieChart,
  Pie,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  instagram: "#8B5CF6",
  linkedin: "#1F2937",
  youtube: "#EF4444",
};

const Overview = ({
  overview,
  chartData,
  engagementDistribution,
  recentPosts,
}) => {
  const safeChartData = useMemo(() => {
    if (!chartData || !Array.isArray(chartData)) return [];

    return chartData.map((d) => {
      const dt = new Date(d.date);

      return {
        ...d,
        dateLabel: dt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),

        instagram: Number(d.instagram ?? 0),
        linkedin: Number(d.linkedin ?? 0),
        youtube: Number(d.youtube ?? 0),
      };
    });
  }, [chartData]);

  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex font-sans antialiased text-slate-900 justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
            Analytics Overview
          </h1>
          <p className="text-gray-400 text-sm">
            Consolidated performance metrics across all active social channels.
          </p>
        </div>

        <div className="flex gap-3 pt-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
            📅 Last 30 Days
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-xs font-bold shadow-lg hover:bg-[#6D28D9] transition-colors">
            Download Report <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Impressions",
            val: overview?.total_impressions || 0,
            icon: Eye,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Total Views",
            val: overview?.total_views || 0,
            icon: BarChart3,
            color: "text-violet-500",
            bg: "bg-violet-50",
          },
          {
            label: "Total Likes",
            val: overview?.total_likes || 0,
            icon: Heart,
            color: "text-pink-500",
            bg: "bg-pink-50",
          },
          {
            label: "Avg. Engagement",
            val: overview?.engagement_rate
              ? overview.engagement_rate + "%"
              : "0%",
            icon: Users,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${kpi.bg} p-2.5 rounded-xl`}>
                <kpi.icon className={`${kpi.color} w-4 h-4`} />
              </div>
            </div>

            <p className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-widest">
              {kpi.label}
            </p>

            <h3 className="text-2xl tracking-tight font-bold text-gray-900">
              {typeof kpi.val === 'number' ? kpi.val.toLocaleString() : kpi.val}
            </h3>
          </div>
        ))}
      </div>

      {/* GROWTH CHART */}
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm mb-8">
        <h3 className="font-bold text-lg text-gray-900 mb-6">
          Platform Growth Comparison
        </h3>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safeChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F3F4F6"
              />

              <XAxis
                dataKey="dateLabel"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
              />

              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />

              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(label, payload) => {
                  if (!payload || !payload.length) return label;
                  const raw = payload[0].payload.date;
                  return new Date(raw).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }}
              />

              <Line
                type="monotone"
                dataKey="instagram"
                stroke={COLORS.instagram}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="linkedin"
                stroke={COLORS.linkedin}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="youtube"
                stroke={COLORS.youtube}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DISTRIBUTION + RECENT POSTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* PIE */}
        <div className="col-span-1 lg:col-span-4 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Engagement Distribution</h3>

          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementDistribution || []}
                  dataKey="percentage"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  stroke="none"
                  activeIndex={activeIndex}
                  isAnimationActive={true}
                  animationDuration={800}
                  activeOuterRadius={95}
                  onMouseEnter={onPieEnter}
                >
                  {(engagementDistribution || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.platform] || "#E5E7EB"}
                      className="outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-3">
            {[
              { name: "Instagram", key: "instagram" },
              { name: "YouTube", key: "youtube" },
              { name: "LinkedIn", key: "linkedin" },
            ].map((platform) => {
              const data = engagementDistribution?.find(
                (p) => p.platform === platform.key
              );
              return (
                <div key={platform.key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[platform.key] }} />
                    <span className="text-gray-600 font-medium">{platform.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{data?.percentage || 0}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT POSTS */}
        <div className="col-span-1 lg:col-span-8 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800">Recent Global Posts</h3>
            <button className="text-sm font-medium text-indigo-600 hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold text-gray-400 border-b border-gray-50 uppercase tracking-wider">
                  <th className="pb-4 text-left">Post</th>
                  <th className="pb-4 text-left">Platform</th>
                  <th className="pb-4 text-left">Impressions</th>
                  <th className="pb-4 text-left">Engagement</th>
                  <th className="pb-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {(recentPosts || []).map((post) => (
                  <tr key={post.post_id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {post.thumbnail ? (
                            <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                              <ImageIcon size={16} /> {/* 2. Use the renamed icon here */}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-700 line-clamp-1">{post.title || "Untitled Post"}</span>
                          <span className="text-[11px] text-gray-400">{post.created_at_human || "Recently"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-md ${
                          post.platform === "instagram" ? "bg-pink-50 text-pink-600" :
                          post.platform === "linkedin" ? "bg-blue-50 text-blue-600" :
                          "bg-red-50 text-red-600"
                        }`}>
                          {post.platform === "instagram" && <Instagram size={14} />}
                          {post.platform === "linkedin" && <Linkedin size={14} />}
                          {post.platform === "youtube" && <Youtube size={14} />}
                        </span>
                        <span className="capitalize">{post.platform}</span>
                      </div>
                    </td>

                    <td className="py-4 text-sm font-medium text-gray-700">
                      {Number(post.impressions || 0).toLocaleString()}
                    </td>

                    <td className="py-4 text-sm font-medium text-gray-700">
                      {post.engagement_rate}%
                    </td>

                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        post.engagement_rate > 5 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-gray-50 text-gray-500"
                      }`}>
                        {post.engagement_rate > 5 ? "High Growth" : "Standard"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;