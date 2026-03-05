export default function DailyAgenda() {
  return (
    <div className="h-full p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Daily Agenda</h2>
        <span className="text-xs text-gray-500">Oct 15, 2024</span>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        You have 4 posts scheduled for today across 3 platforms.
      </p>

      <div className="space-y-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-xl bg-gray-50"
          >
            <div className="text-xs text-gray-500">09:00 AM</div>
            <div className="mt-1 font-medium text-gray-900">
              Q3 Strategy Announcement
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Scheduled
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm">
        <div className="font-semibold text-blue-700 mb-1">
          AI Optimization Tip
        </div>
        Posting at 11:30 AM typically sees 15% more engagement.
      </div>
    </div>
  );
}