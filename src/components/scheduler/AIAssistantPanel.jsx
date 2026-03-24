import { useState, useEffect, useRef } from "react";
import { aiService } from "../../services/aiService";
import { getPlatformTone } from "../../services/aiHelper";

export default function AIAssistPanel({
  onClose,
  content,
  setContent,
  platform,
  isOpen, // ✅ REQUIRED
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const chatRef = useRef(null);

  const tone = getPlatformTone(platform);
  const audience = "general audience";

  const storageKey = `ai_chat_${platform}`;

  useEffect(() => {
    console.log("LOADING HISTORY FROM STORAGE...");

    try {
      const saved = sessionStorage.getItem(storageKey);

      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("RESTORED:", parsed);
        setHistory(parsed);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("PARSE ERROR", err);
      setHistory([]);
    }

    setIsHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!isHydrated) return;

    console.log("SAVING HISTORY:", history);

    sessionStorage.setItem(storageKey, JSON.stringify(history));
  }, [history, storageKey, isHydrated]);

  // ✅ Auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history, loading]);

  // ⚠️ Optional: sync editor → last AI message (safe version)
  useEffect(() => {
    if (!content) return;

    setHistory((prev) => {
      if (!prev.length) return prev;

      const last = prev[prev.length - 1];
      if (last.role !== "assistant") return prev;

      const updated = [...prev];
      updated[updated.length - 1] = {
        ...last,
        parsed: {
          ...last.parsed,
          caption: content,
        },
      };

      return updated;
    });
  }, [content]);

  const handleGenerate = async () => {
    if (!input || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedHistory = [...history, userMessage];

    setHistory(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await aiService.generatePost({
        history: updatedHistory,
        platform,
        tone,
        audience,
      });

      const data = res?.data || res || {};

      const safeData = {
        hook: data.hook || "",
        caption: data.caption || "",
        hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
        format: data.format || "post",
      };

      const assistantMessage = {
        role: "assistant",
        content: JSON.stringify(safeData),
        parsed: safeData,
      };

      setHistory((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("AI ERROR:", err);

      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "error",
          parsed: {
            hook: "",
            caption: "⚠️ Failed to generate. Try again.",
            hashtags: [],
          },
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-40  right-4 w-[400px] h-[600px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden ring-1 ring-black/5">
      {/* Header - Stays at Top */}
      <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <h3 className="text-[13px] font-bold text-slate-800 tracking-tight uppercase">
            AI Content Assistant
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat History - Fixed Scroll Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {history.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
            <span className="text-2xl mb-2">✍️</span>
            <p className="text-sm font-medium text-slate-500">
              Ready to draft for {platform}
            </p>
          </div>
        )}

        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="space-y-3">
                  {msg.parsed?.hook && (
                    <p className="font-bold text-blue-600 text-[11px] uppercase tracking-widest italic">
                      "{msg.parsed.hook}"
                    </p>
                  )}
                  <p className="whitespace-pre-line">
                    {msg.parsed?.caption || msg.content}
                  </p>
                  {msg.role === "assistant" && msg.parsed?.caption && (
                    <button
                      onClick={() => setContent(msg.parsed.caption)}
                      className="w-full mt-2 py-2 bg-slate-900 text-white rounded-lg font-semibold text-[11px] hover:bg-blue-600 transition-all active:scale-95"
                    >
                      Apply to Editor
                    </button>
                  )}
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest pl-2">
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </span>
            Thinking...
          </div>
        )}
      </div>

      {/* Input Section - Stays at Bottom */}
      <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
        <div className="relative border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-slate-50">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to write or edit..."
            className="w-full h-16  border-gray-300 rounded p-2 text-xs mb-2 resize-none outline-none focus:outline-none focus:ring-0 focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
          <div className="flex justify-between items-center p-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-medium ml-1">
              Shift + Enter for new line
            </span>
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
