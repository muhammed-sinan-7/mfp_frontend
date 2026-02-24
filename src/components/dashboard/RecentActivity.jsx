function RecentActivity() {
  const activities = [
    { name: "Sarah Chen", action: "scheduled a post", platform: "Instagram" },
    { name: "System", action: "connected new account", platform: "LinkedIn" },
    { name: "James Wilson", action: "replied to comment", platform: "YouTube" },
    { name: "Analytics", action: "weekly report generated", platform: "Workspace" },
  ];

  return (
    <div className="bg-[#16161d] border border-[#2a2a33] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#7c5dfa]/20 rounded-full"></div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">{item.name}</span>{" "}
                {item.action}
              </p>
              <p className="text-xs text-gray-500">{item.platform}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 text-sm text-[#7c5dfa] hover:underline">
        View Audit Log
      </button>
    </div>
  );
}

export default RecentActivity;