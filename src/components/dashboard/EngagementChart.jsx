import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", reach: 2500, engagement: 4000 },
  { day: "Tue", reach: 1500, engagement: 3200 },
  { day: "Wed", reach: 10000, engagement: 2000 },
  { day: "Thu", reach: 4000, engagement: 2800 },
  { day: "Fri", reach: 5000, engagement: 2100 },
  { day: "Sat", reach: 3800, engagement: 2400 },
  { day: "Sun", reach: 4500, engagement: 3300 },
];

function EngagementChart() {
  return (
    <div className="h-full flex flex-col bg-[#16161d] border border-[#2a2a33] rounded-2xl p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Engagement Trends</h2>
        <p className="text-xs text-gray-400">
          Daily reach vs engagement performance
        </p>
      </div>

    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c5dfa" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#7c5dfa" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#2a2a33" vertical={false} />

          <XAxis
            dataKey="day"
            stroke="#6b7280"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <YAxis
            stroke="#6b7280"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1c24",
              border: "1px solid #2a2a33",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="reach"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#reachGradient)"
          />

          <Area
            type="monotone"
            dataKey="engagement"
            stroke="#7c5dfa"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#engagementGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EngagementChart;