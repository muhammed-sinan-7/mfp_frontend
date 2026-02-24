function Topbar() {
  const orgName = localStorage.getItem("orgName");

  return (
    <div className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#111118]">
      
      <div className="text-sm text-gray-400">
        {orgName || "Workspace"}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-300">Admin</div>
        <div className="w-8 h-8 bg-[#7c5dfa] rounded-full"></div>
      </div>

    </div>
  );
}

export default Topbar;