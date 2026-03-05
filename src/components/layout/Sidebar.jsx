import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  LinkIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Connected Accounts", icon: LinkIcon, path: "/dashboard/accounts" },
    { name: "Post Management", icon: ClipboardDocumentListIcon, path: "/dashboard/posts" },
    { name: "Schedule", icon: CalendarIcon, path: "/dashboard/scheduler" },
    { name: "Team Members", icon: UsersIcon, path: "/dashboard/team" },
    { name: "Audit Logs", icon: ChartBarIcon, path: "/dashboard/audit" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/dashboard/settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">

      <div>
        <div className="px-6 py-5 text-xl font-semibold text-blue-600">
          MFP
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;