import React, { useMemo } from "react";
import { useInstagramAnalytics } from "../../hooks/useInstagramAnalytics";
import {
  Users,
  Eye,
  MousePointer2,
  CheckCircle2,
  Filter,
  Share2,
  Zap,
  Download,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InstagramAnalytics = () => {
  const { overview, growth, topPosts, gallery, performance } =
    useInstagramAnalytics();

  const kpiData = [
    {
      label: "Accounts Reached",
      val: overview?.accounts_reached || 0,
      trend: "+5%",
      icon: Eye,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
    {
      label: "Profile Visits",
      val: overview?.profile_visits || 0,
      trend: "+3%",
      icon: MousePointer2,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      label: "Likes",
      val: overview?.likes || 0,
      trend: "+4%",
      icon: Users,
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      label: "Story Completion",
      val: overview?.story_completion || 0,
      trend: "+1%",
      icon: CheckCircle2,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="w-full bg-[#F9FAFB] min-h-screen  font-sans text-gray-900">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Instagram Insights
            </h1>
            <p className="text-gray-400 pt-1 text-sm">
              Detailed performance tracking for your Instagram presence.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
              <Share2 size={14} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-xs font-bold shadow-md">
              <Zap size={14} fill="currentColor" /> Boost Content
            </button>
          </div>
        </div>

        {/* Updated KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${kpi.bg} p-2 rounded-lg`}>
                  <kpi.icon className={`${kpi.color} w-4 h-4`} />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.trend.startsWith("+") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                >
                  {kpi.trend}
                </span>
              </div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                {kpi.label}
              </p>
              <h3 className="text-2xl font-bold text-gray-900">{kpi.val}</h3>
            </div>
          ))}
        </div>

        {/* Middle Section: Chart & Top Performing */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Engagement Area Chart */}
          <div className="col-span-8 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-gray-900">Engagement Growth</h3>
                <p className="text-gray-400 text-[10px]">
                  Metrics tracked across the last 7 days.
                </p>
              </div>
              <div className="flex gap-4 text-[10px] font-bold text-gray-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-violet-500" /> Likes
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-900" /> Comments
                </div>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growth}>
                  <defs>
                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F3F4F6"
                  />
                  <XAxis
                    dataKey="dateLabel"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  />
                  <Tooltip />
                  <Area
                    type="basis"
                    dataKey="likes"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorLikes)"
                  />
                  <Area
                    type="monotone"
                    dataKey="comments"
                    stroke="#1F2937"
                    strokeWidth={2}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Sidebar */}
          <div className="col-span-4 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-sm mb-1">Top Performing</h3>
            <p className="text-gray-400 text-[10px] mb-6">
              Best engagement rate this week.
            </p>
            <div className="space-y-5 flex-1">
              {topPosts?.map((post, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={`https://api.dicebear.com/7.x/shapes/svg?seed=${post.post_id}`}
                      alt=""
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-violet-600 uppercase mb-0.5">
                      Top Content
                    </p>

                    <p className="text-xs font-bold text-gray-900 truncate">
                      {post.title}
                    </p>

                    <div className="flex gap-2 text-[12px] text-gray-400 mt-1">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    {post.engagement}% ER
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full text-violet-600 text-[10px] font-bold mt-6 flex items-center justify-center gap-1">
              View All Content <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Media Gallery Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Recent Media Gallery</h3>
            <button className="text-violet-600 text-xs font-bold">
              View Insights Grid
            </button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group cursor-pointer"
              >
                <img
                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=gallery-${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Performance Table */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold">Content Performance</h3>
              <p className="text-gray-400 text-xs">
                A granular look at your recent posts and their reach.
              </p>
            </div>
            <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold border border-gray-100 flex items-center gap-2">
              Download CSV <Download size={14} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <tr>
                <th className="px-6 py-4">Post Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Engagement</th>
                <th className="px-6 py-4">Total Reach</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {performance?.map((post, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100" />
                      <span className="text-xs font-bold text-gray-900">
                        {post.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {post.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-700">
                    {post.engagement}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-700">
                    {post.reach}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-violet-600">
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-400 text-xs italic"
                  >
                    No recent post data available to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstagramAnalytics;
