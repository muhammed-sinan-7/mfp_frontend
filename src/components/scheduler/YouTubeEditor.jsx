import React, { useState, useMemo, useRef } from "react";
import { 
  Play, Upload, X, Plus, Globe, Lock, EyeOff, Trash2 
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
  const [tags, setTags] = useState(["SaaS", "Marketing", "Growth", "Automation"]);
  const [visibility, setVisibility] = useState("public");
  
  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  // Reusing your date/time parsing logic
  const datePart = scheduledTime?.slice(0, 10) || "";
  const timePart = scheduledTime?.slice(11, 16) || "";

  // Handle Media Selection
  const media = platformMedia[target?.id] || { video: null, thumbnail: null };
  
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
    <div className="flex gap-3 min-h-screen font-sans text-[#1D2226] bg-[#F8F9FB] p-2">
      
      {/* --- LEFT COLUMN: SCHEDULING --- */}
      <div className="w-72 h-fit rounded-xl p-6 border border-gray-100 shrink-0 bg-white shadow-sm">
        <section className="mb-8">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Scheduling</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Date</label>
              <input
                type="date"
                value={datePart}
                onChange={(e) => setScheduledTime(`${e.target.value}T${timePart || "10:00"}`)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Time</label>
              <input
                type="time"
                value={timePart}
                onChange={(e) => setScheduledTime(`${datePart}T${e.target.value}`)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </section>
      </div>

      {/* --- MIDDLE COLUMN: MAIN CONTENT --- */}
      <div className="flex-1 bg-white rounded-xl p-8 border border-gray-100 shadow-sm overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create YouTube Video</h2>
              <p className="text-sm text-gray-500 mt-1">Optimize your video assets for discovery.</p>
            </div>
          </div>

          {/* Media Section: Fixed Selection Logic */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white transition cursor-pointer relative overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/*" 
                onChange={handleVideoChange} 
              />
              {videoPreviewUrl ? (
                <video src={videoPreviewUrl} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <Upload size={24} className="text-purple-600 mb-2" />
                  <p className="text-sm font-bold">Select Video</p>
                </>
              )}
            </div>
            
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Thumbnail Auto-gen</p>
            </div>
          </div>

          {/* Title & Content Binding */}
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Video Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:border-purple-500 outline-none" 
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Description</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 p-3 border border-gray-200 rounded-xl text-sm focus:border-purple-500 outline-none resize-none" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: PREVIEW --- */}
      <div className="w-[420px] space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Desktop Preview</h3>
          <div className="rounded-xl overflow-hidden border border-gray-100 shadow-lg">
            <div className="aspect-video bg-black relative flex items-center justify-center">
              {videoPreviewUrl ? (
                <video src={videoPreviewUrl} className="w-full h-full" controls={false} />
              ) : (
                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white">
                  <Play size={16} fill="currentColor" />
                </div>
              )}
            </div>
            <div className="p-4">
              {/* This now updates in real-time as you type */}
              <p className="font-bold text-sm text-gray-900 leading-tight mb-3">
                {title || "Untitled Video"}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="text-[12px] font-bold">MFP Growth Academy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}