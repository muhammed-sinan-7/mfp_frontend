import React, { useState, useMemo, useRef } from "react";
import { 
  Play, Upload, X, Plus, Globe, Lock, EyeOff, Trash2, Sparkles, Video, 
  Settings, Info, Layout, Maximize2
} from "lucide-react";

export default function YouTubeEditor({
  target,
  content,
  setContent,
  platformMedia,
  setPlatformMedia,
  scheduledTime,
  setScheduledTime,
}) {
  const [title, setTitle] = useState("How to Scale Your SaaS in 2026: Complete Guide");
  
  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  // Parsing logic
  const datePart = scheduledTime?.slice(0, 10) || "";
  const timePart = scheduledTime?.slice(11, 16) || "";

  // Media Selection
  const media = platformMedia[target?.id] || { video: null };
  
  const videoPreviewUrl = useMemo(() => {
    if (!media.video) return null;
    return URL.createObjectURL(media.video);
  }, [media.video]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlatformMedia((prev) => ({
        ...prev,
        [target.id]: { ...prev[target.id], video: file },
      }));
    }
  };

  return (
    <div className="flex gap-4 font-sans text-[#1E293B] bg-[#F8FAFC] min-h-screen">
      
      {/* --- LEFT COLUMN: CONFIGURATION --- */}
      <div className="w-72 h-[calc(100vh-20px)] rounded-xl p-6 border border-slate-200 overflow-y-auto shrink-0 bg-white shadow-sm ml-2 mt-2">
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={14} className="text-blue-600" />
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Video Settings
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase">Schedule Date</label>
              <input
                type="date"
                value={datePart}
                onChange={(e) => setScheduledTime(`${e.target.value}T${timePart || "10:00"}`)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase">Schedule Time</label>
              <input
                type="time"
                value={timePart}
                onChange={(e) => setScheduledTime(`${datePart}T${e.target.value}`)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
        </section>

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-600" />
            <p className="text-[11px] font-bold text-blue-600 uppercase">AI Suggestion</p>
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed mb-3 font-medium">
            YouTube Shorts perform better at <span className="font-bold">7:00 PM</span>. 
          </p>
          <button
            onClick={() => setScheduledTime(`${datePart}T19:00`)}
            className="text-[11px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Apply Time
          </button>
        </div>
      </div>

      {/* --- MIDDLE COLUMN: EDITOR --- */}
      <div className="flex-1 bg-white h-[calc(100vh-20px)] rounded-xl p-10 overflow-y-auto border border-slate-200 shadow-sm mt-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create YouTube Video</h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">Optimize your assets for maximum reach.</p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event("open-ai"))}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl transition-all shadow-md active:scale-95 text-xs font-bold"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span>AI Assistant</span>
            </button>
          </div>

          <div className="space-y-8">
            {/* Asset Selection Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => fileInputRef.current.click()}
                className="group relative aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-blue-400 transition-all cursor-pointer overflow-hidden"
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleVideoChange} />
                {videoPreviewUrl ? (
                  <video src={videoPreviewUrl} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload size={18} />
                    </div>
                    <p className="text-xs font-bold text-slate-600 uppercase">Upload Video</p>
                  </>
                )}
              </div>
              
              <div className="aspect-video border border-slate-200 rounded-2xl bg-slate-50/50 border-dashed flex flex-col items-center justify-center text-center p-4">
                <Layout size={20} className="text-slate-300 mb-2" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">Thumbnail<br/>Auto-generation</p>
              </div>
            </div>

            {/* Content Fields */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Video Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl text-base font-bold text-slate-800 focus:border-blue-500 outline-none transition-all shadow-sm" 
                  placeholder="Enter video title..."
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Description</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-48 p-4 bg-white border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-700 focus:border-blue-500 outline-none resize-none transition-all shadow-sm" 
                  placeholder="Tell viewers about your video..."
                />
                <div className="flex justify-end mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{content.length} / 5000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: PREVIEW --- */}
      <div className="w-[480px] bg-[#F1F5F9] border-l border-slate-200 h-screen overflow-y-auto">
        <div className="max-w-[400px] mx-auto py-10 px-4 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Desktop Preview</h3>
            <div className="flex gap-1">
               <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400">
                <Maximize2 size={14} />
              </div>
            </div>
          </div>

          {/* YouTube Desktop Style Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-slate-200">
            <div className="aspect-video bg-black relative flex items-center justify-center">
              {videoPreviewUrl ? (
                <video src={videoPreviewUrl} className="w-full h-full" />
              ) : (
                <div className="w-16 h-11 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                  <Play size={20} fill="currentColor" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0 border border-slate-100" />
                <div className="space-y-1">
                  <p className="font-bold text-[14px] text-slate-900 leading-snug line-clamp-2">
                    {title || "Enter a compelling title..."}
                  </p>
                  <div className="text-[12px] text-slate-500 font-medium">
                    <p>{target?.display_name || "Growth Academy"}</p>
                    <p>1.2M views • Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Info size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 mb-1">Upload Details</p>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Standard Definition (SD) is processing first. 4K and HDR will be available shortly after publishing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}