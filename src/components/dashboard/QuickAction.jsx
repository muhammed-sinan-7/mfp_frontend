function QuickActions() {
  return (
    <div className="bg-[#16161d] border border-[#2a2a33] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <p className="text-sm text-gray-400 mb-6">
        Accelerate your workflow
      </p>

      <div className="space-y-4">
        

        <button className="w-full bg-[#1c1c24] border border-[#2a2a33] py-3 rounded-xl hover:border-[#7c5dfa]/40 transition">
          Connect Instagram
        </button>

        <button className="w-full bg-[#1c1c24] border border-[#2a2a33] py-3 rounded-xl hover:border-[#7c5dfa]/40 transition">
          Connect LinkedIn
        </button>
      </div>
    </div>
  );
}

export default QuickActions;