function StatCard({ title, value, growth }) {
  const positive = growth.includes("+");

  return (
    <div className="relative bg-[#16161d] border border-[#2a2a33] p-6 rounded-2xl hover:border-[#7c5dfa]/40 transition-all duration-300">
      
      {/* Growth */}
      <div className="absolute top-4 right-4 text-xs font-medium">
        <span className={positive ? "text-green-400" : "text-red-400"}>
          {growth}
        </span>
      </div>

      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default StatCard;