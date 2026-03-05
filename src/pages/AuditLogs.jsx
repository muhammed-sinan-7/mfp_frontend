import { useEffect, useState } from "react";
import { fetchAuditLogs } from "../services/auditService";
import AuditTable from "../components/audit/AuditTable";
import {
  FunnelIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAuditLogs({ page, search });
      setLogs(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Audit fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [page, search]);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">
            Audit Logs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor platform activity and administrative changes.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm">
            <FunnelIcon className="w-4 h-4" />
            Advanced Filters
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export CSV/PDF
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <input
            type="text"
            placeholder="Search by action, target, or IP address..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full md:w-96 border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs">
              Today
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs">
              Past 7 Days
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs">
              System Events
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading audit logs...
          </div>
        ) : (
          <AuditTable logs={logs} />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Showing page {page} · {count} total records
        </span>

        <button
          disabled={logs.length < 20}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* Retention Policy Box */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium">
            Log Retention Policy
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Audit logs are retained for compliance and security standards.
          </p>
        </div>

        <button className="border border-indigo-300 px-4 py-2 rounded-lg text-sm">
          Update Retention Settings
        </button>
      </div>

    </div>
  );
}

export default AuditLogs;