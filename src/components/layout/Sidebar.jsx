import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
 
  LinkIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Scheduler", icon: CalendarIcon, path: "/dashboard/scheduler" },
    { name: "Accounts", icon: LinkIcon, path: "/dashboard/accounts" },
    { name: "Analytics", icon: ChartBarIcon, path: "/dashboard/analytics" },
    { name: "Team", icon: UsersIcon, path: "/dashboard/team" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/dashboard/settings" },
  ];

  return (
    <div className="w-64 bg-[#111118] border-r border-gray-800 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="p-6 text-2xl font-bold text-[#7c5dfa]">
          MFP
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-[#7c5dfa]/20 text-[#7c5dfa]"
                    : "text-gray-400 hover:bg-[#1c1c24]"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition"
        >
          {/* <ArrowLeftOnRectangleIcon className="w-5 h-5" /> */}
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;