function StatCard({ title, value, growth }) {
  const isPositive = growth.includes("+");

  return (
    <div className="bg-[#16161d] border border-[#2a2a33] p-6 rounded-2xl">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{title}</span>
        <span className={isPositive ? "text-green-400" : "text-red-400"}>
          {growth}
        </span>
      </div>

      <h2 className="text-2xl font-bold mt-4">{value}</h2>
    </div>
  );
}

export default StatCard;