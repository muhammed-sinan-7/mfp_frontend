export default function IntegrationHealth({ integrations }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Integration Health</h3>

      {Object.entries(integrations).map(([key, value]) => (
        <div key={key} className="flex justify-between text-sm mb-2">
          <span>{key}</span>
          <span className={value ? "text-green-500" : "text-red-500"}>
            {value ? "Connected" : "Not Connected"}
          </span>
        </div>
      ))}
    </div>
  );
}