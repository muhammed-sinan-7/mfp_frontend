import StatCard from "../../components/dashboard/StatCard";
import EngagementChart from "../../components/dashboard/EngagementChart";
import QuickActions from "../../components/dashboard/QuickAction";
import RecentActivity from "../../components/dashboard/recentActivity";
import ConnectedAccounts from "../../pages/ConnectedAccounts";

function Overview() {
  return (
    <div className="h-full flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Performance Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Welcome back. Here's what's happening across your channels.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Total Reach" value="2.4M" growth="+12.5%" />
        <StatCard title="Avg. Engagement" value="4.8%" growth="+2.1%" />
        <StatCard title="Posts Scheduled" value="124" growth="-5.0%" />
        <StatCard title="Growth Rate" value="+18.2%" growth="+4.3%" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">

        {/* Chart */}
        <div className="col-span-2 min-h-0">
          <EngagementChart />
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-6 min-h-0">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>

      {/* Bottom Accounts */}
      {/* <ConnectedAccounts /> */}

    </div>
  );
}

export default Overview;