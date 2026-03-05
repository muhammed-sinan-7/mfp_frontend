function IntegrationHealth() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Integration Health</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>LinkedIn</span>
          <span className="text-green-500">Connected</span>
        </div>
        <div className="flex justify-between">
          <span>Meta Business</span>
          <span className="text-green-500">Connected</span>
        </div>
        <div className="flex justify-between">
          <span>YouTube</span>
          <span className="text-red-500">Not Connected</span>
        </div>
      </div>
    </div>
  );
}

export default IntegrationHealth;