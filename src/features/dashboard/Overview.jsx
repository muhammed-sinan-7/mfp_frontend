import StatCard from "../../components/dashboard/StatCard";
import AIInsightsCard from "../../components/dashboard/AIInsightsCard";
import IntegrationHealth from "../../components/dashboard/IntegrationHealth";

function Overview() {
  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">
          Welcome back. Here is what's happening across your channels today.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Total Reach" value="1.2M" growth="+12.5%" />
        <StatCard title="Engagement Rate" value="4.8%" growth="+0.4%" />
        <StatCard title="Conversions" value="852" growth="+18.2%" />
        <StatCard title="Ad Spend" value="$12.4k" growth="-2.1%" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <AIInsightsCard />
        </div>

        <IntegrationHealth />
      </div>
    </div>
  );
}

export default Overview;