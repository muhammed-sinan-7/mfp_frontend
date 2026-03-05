function AIInsightsCard() {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          AI Marketing Insights
        </h3>
        <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
          Live Feed
        </span>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-lg mb-3">
        <div className="text-sm font-medium text-gray-800">
          Peak Engagement Alert
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your LinkedIn posts perform 40% better on Tuesdays at 10:00 AM.
        </p>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-lg">
        <div className="text-sm font-medium text-gray-800">
          Content Gap Identified
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Video content on Meta has decreased by 20% this week.
        </p>
      </div>
    </div>
  );
}

export default AIInsightsCard;