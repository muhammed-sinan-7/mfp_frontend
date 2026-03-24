import { useEffect, useState } from "react";
import {
  PlusIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  socialList,
  refreshAccount,
  disconnectAccount,
} from "../services/accountService";
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
        setAccounts(data.data || []);
      } catch (err) {
        setError("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleRefresh = async (accountId) => {
    try {
      await refreshAccount(accountId);
      alert("Refresh triggered");
    } catch (err) {
      console.error(err);
      alert("Failed to refresh");
    }
  };

  const handleDisconnect = async (accountId) => {
    try {
      await disconnectAccount(accountId);

      // update UI
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
    } catch (err) {
      console.error(err);
      alert("Failed to disconnect");
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

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const flattenedTargets = accounts.flatMap((account) =>
    (account.publishing_targets || []).map((target) => ({
      ...target,
      parentAccount: account,
    })),
  );

  const healthy = flattenedTargets.filter(
    (t) => calculateTokenHealth(t.parentAccount.token_expires_at) > 60,
  ).length;

  const alerts = flattenedTargets.filter(
    (t) => calculateTokenHealth(t.parentAccount.token_expires_at) < 20,
  ).length;

  return (
    <div className="space-y-8">
      <ConnectAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Connected Accounts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your organization's social platform integrations.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <SummaryCard title="Healthy" value={healthy} />
        <SummaryCard title="Alerts" value={alerts} />
        <SummaryCard title="Total Profiles" value={flattenedTargets.length} />
        <SummaryCard title="Platforms" value={accounts.length} />
      </div>

      {/* Account Grid */}
      <div className="grid grid-cols-3 gap-6">
        {flattenedTargets.map((target) => {
          const tokenHealth = calculateTokenHealth(
            target.parentAccount.token_expires_at,
          );

          return (
            <div
              key={target.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{target.display_name}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                  Active
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-4">{target.provider}</p>

              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Token Health</span>
                  <span>{tokenHealth}%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${tokenHealth}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Expires on{" "}
                  {new Date(
                    target.parentAccount.token_expires_at,
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleRefresh(target.parentAccount.id)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Refresh
                </button>
                {/* <button className="text-sm text-gray-600 hover:text-gray-900">
                  Settings
                </button> */}
                <button
                  onClick={() => handleDisconnect(target.parentAccount.id)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Disconnect
                </button>
              </div>
            </div>
          );
        })}

        {/* Add New Card */}
        <div
          onClick={() => setShowModal(true)}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 transition"
        >
          <PlusIcon className="w-6 h-6 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600">Connect New Account</p>
        </div>
      </div>

      {/* Help Section */}
      {/* <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium">
            Need help with integrations?
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Learn how to manage enterprise scopes and troubleshoot authentication errors.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
            Integration Guide
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
            API Reference
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
            Contact Support
          </button>
        </div>
      </div> */}
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
}

export default ConnectedAccounts;
