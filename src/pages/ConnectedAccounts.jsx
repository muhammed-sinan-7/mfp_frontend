import { useEffect, useState } from "react";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { socialList } from "../services/accountService";
import ConnectAccountModal from "../components/connectaccountmodel/ConnectAccountModal";

function ConnectedAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await socialList();
        console.log(data);
        setAccounts(data.data || []);
      } catch (err) {
        setError("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "expiring":
        return "bg-yellow-500/20 text-yellow-400";
      case "disconnected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const calculateTokenHealth = (expiresAt) => {
    if (!expiresAt) return 0;

    const now = new Date();
    const expiry = new Date(expiresAt);
    const totalDuration = 60 * 24 * 60 * 60 * 1000;
    const remaining = expiry - now;

    const percentage = (remaining / totalDuration) * 100;

    return Math.max(0, Math.min(100, Math.round(percentage)));
  };

  if (loading) {
    return <div className="p-8 text-gray-400">Loading accounts...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="p-8 text-white">
      <ConnectAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Connected Accounts</h1>
          <p className="text-gray-400 text-sm">
            Manage your connected social platforms
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#7c5dfa] hover:bg-[#6b4df5] transition px-5 py-2 rounded-lg text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          Connect New Account
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Active Connections"
          value={accounts.filter((a) => a.status === "active").length}
        />
        <StatCard
          title="Expiring Tokens"
          value={accounts.filter((a) => a.status === "expiring").length}
        />
        <StatCard title="Total Accounts" value={accounts.length} />
        <StatCard title="Pending Auth" value="0" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {accounts.map((account) => {
          const tokenHealth = calculateTokenHealth(account.token_expires_at);

          return (
            <div
              key={account.id}
              className="bg-[#15151e] border border-gray-800 rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg capitalize">
                  {account.provider}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${getStatusBadge(
                    account.status,
                  )}`}
                >
                  {account.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                @{account.account_name}
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Token Health</span>
                  <span>{tokenHealth}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div
                    className="bg-[#7c5dfa] h-2 rounded-full"
                    style={{ width: `${tokenHealth}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {account.status === "expiring" && (
                  <button className="flex items-center gap-2 text-yellow-400 text-sm">
                    <ArrowPathIcon className="w-4 h-4" />
                    Refresh
                  </button>
                )}

                {account.status === "disconnected" && (
                  <button className="flex items-center gap-2 text-red-400 text-sm">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    Reconnect
                  </button>
                )}

                <button className="text-gray-400 hover:text-white text-sm">
                  Manage
                </button>
              </div>
            </div>
          );
        })}

        {accounts.length === 0 && (
          <div className="col-span-3 text-center text-gray-500">
            No connected accounts yet.
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#15151e] border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

export default ConnectedAccounts;
