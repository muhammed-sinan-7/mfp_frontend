import { useDashboardData } from "../../hooks/useDashboardData";
import StatCard from "../../components/dashboard/StatCard";
import IntegrationHealth from "../../components/dashboard/IntegrationHealth";
import { TrendingUp, Calendar, AlertCircle, Zap, ArrowUpRight, Newspaper, Image as ImageIcon } from "lucide-react";

function Overview() {
  const data = useDashboardData();

  if (!data) return (
    <div className="flex h-[80vh] items-center justify-center text-slate-400 font-medium animate-pulse">
      Loading system metrics...
    </div>
  );

  return (
    <div className="flex flex-col gap-8 font-sans">
      
      {/* TOP HEADER */}
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Analytics Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time performance across your integrated platforms.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all">
          Generate Report
        </button>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* STATS SECTION */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reach"
            value={data.stats?.reach?.toLocaleString() || "0"}
            icon={<TrendingUp size={18} className="text-blue-600" />}
            growth="+12.4%"
          />
          <StatCard
            title="Avg. Engagement"
            value={`${data.stats?.engagement_rate || 0}%`}
            icon={<Zap size={18} className="text-blue-600" />}
            growth="+2.1%"
          />
          <StatCard
            title="Planned Content"
            value={data.posts?.scheduled || 0}
            icon={<Calendar size={18} className="text-blue-600" />}
            growth="0"
          />
          <StatCard
            title="System Errors"
            value={data.posts?.failed || 0}
            icon={<AlertCircle size={18} className="text-red-500" />}
            growth={data.posts?.failed > 0 ? "+1" : "0"}
            className={data.posts?.failed > 0 ? "border-red-200" : ""}
          />
        </div>

        {/* FEED PERFORMANCE (LEFT) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Top Performing Feed</h3>
              <span className="text-xs font-bold text-blue-600 cursor-pointer">View All</span>
            </div>
            
            <div className="divide-y divide-slate-50">
              {data.top_posts?.map((post, i) => (
                <div key={i} className="p-6 hover:bg-slate-50/50 transition-all flex items-center gap-6 group">
                  {/* Mock Post Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 shrink-0 overflow-hidden border border-slate-100">
                    {post.image ? <img src={post.image} alt="" className="object-cover w-full h-full" /> : <ImageIcon size={20} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-base truncate group-hover:text-blue-600 transition-colors">
                      {post.title || "Untitled Performance Update"}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 rounded text-slate-500 uppercase">{post.platform}</span>
                      <span className="text-sm text-slate-400 font-medium">{post.engagement} interactions</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                      <ArrowUpRight size={14} />
                      {((post.engagement / 100) * 5).toFixed(1)}%
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">Velocity</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* NEWS FEED */}
             <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper size={16} className="text-blue-600" />
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Industry Intelligence</h3>
                </div>
                <div className="space-y-6">
                  {data.news?.map((n, i) => (
                    <a key={i} href={n.url} className="block group">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 leading-snug">{n.title}</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase group-hover:text-slate-600 transition-colors">Read Brief &rarr;</p>
                    </a>
                  ))}
                </div>
             </div>

             {/* ACTIVITY LOG */}
             <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 relative z-10">System Status</h3>
                <div className="space-y-4 relative z-10">
                  {data.recent_posts?.slice(0, 3).map((post, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${post.status === 'published' ? 'bg-green-400' : 'bg-blue-400'}`} />
                      <span className="text-sm font-medium text-slate-300 truncate">{post.title}</span>
                    </div>
                  ))}
                </div>
                <Zap size={100} className="absolute -right-8 -bottom-8 text-white/5 -rotate-12" />
             </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-2">
            <IntegrationHealth integrations={data.integrations || {}} />
          </div>
          
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Optimization</h4>
            <p className="text-sm text-blue-900 font-medium leading-relaxed">
              Your engagement peaks on <span className="font-bold">Tuesdays</span>. Schedule your next big launch for tomorrow at 11:30 AM.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Overview;
