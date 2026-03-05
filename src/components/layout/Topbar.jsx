function Topbar() {
  const orgName = localStorage.getItem("orgName");
  const role = localStorage.getItem("role");

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      
      <div className="text-sm font-medium text-gray-700">
        {orgName || "Workspace"}
      </div>

      <div className="flex items-center gap-6">
        
        <div className="text-right">
          <div className="text-sm font-medium text-gray-800">{orgName}</div>
          <div className="text-xs text-gray-500">{role || "Admin"}</div>
        </div>

        <div className="w-9 h-9 bg-blue-600 rounded-full flex justify-center items-center text-white">{orgName}</div>
      </div>
    </div>
  );
}

export default Topbar;