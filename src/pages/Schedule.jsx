import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarSection from "../components/schedule/CalenderSection";
import DailyAgenda from "../components/schedule/DailyAgenda";
import StatsFooter from "../components/schedule/StatsFooter";
import { getPublishingTargets, createPost } from "../services/postService";

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [targets, setTargets] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [scheduledTime, setScheduledTime] = useState("");
  const [platformMedia, setPlatformMedia] = useState({});

  useEffect(() => {
    if (!isDrawerOpen) return;

    async function loadTargets() {
      try {
        const res = await getPublishingTargets();
        console.log("Targets:", res.data);
        setTargets(res.data.results || []);
      } catch (err) {
        console.error("Failed to load targets", err);
      }
    }

    loadTargets();
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen || !selectedDate) return;

    const defaultTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      10,
      0,
    );

    setScheduledTime(defaultTime.toISOString().slice(0, 16));
  }, [isDrawerOpen, selectedDate]);

  const selectedProviders = Array.isArray(targets)
    ? targets
        .filter((t) => selectedTargets.includes(t.id))
        .map((t) => t.provider)
    : [];

  const requiresImage = selectedProviders.includes("instagram");
  const requiresVideo = selectedProviders.includes("youtube");

  const handleCreate = async () => {
    if (selectedTargets.length === 0) {
      alert("Select at least one platform");
      return;
    }

    // platform-specific validation
    for (const id of selectedTargets) {
      const target = targets.find((t) => t.id === id);
      if (!target) continue;

      const provider = target.provider;
      const media = platformMedia[id] || {};

      if (provider === "instagram" && !media.image) {
        alert("Instagram requires image");
        return;
      }

      if (provider === "youtube" && !media.video) {
        alert("YouTube requires video");
        return;
      }
    }

    const formData = new FormData();

    formData.append("caption", content);
    formData.append("scheduled_time", new Date(scheduledTime).toISOString());

    selectedTargets.forEach((id) =>
      formData.append("publishing_target_ids", id),
    );

    selectedTargets.forEach((id) => {
      const media = platformMedia[id];
      if (!media) return;

      if (media.image) {
        formData.append(`image_${id}`, media.image);
      }

      if (media.video) {
        formData.append(`video_${id}`, media.video);
      }
    });

    try {
      await createPost(formData);

      setIsDrawerOpen(false);
      setContent("");
      setImageFile(null);
      setVideoFile(null);
      setSelectedTargets([]);
      setPlatformMedia({});
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* MAIN AREA */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="flex-1 min-w-0 min-h-0 px-8 py-6">
          <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <CalendarSection
              currentMonth={currentMonth}
              onPrev={() => setCurrentMonth((prev) => subMonths(prev, 1))}
              onNext={() => setCurrentMonth((prev) => addMonths(prev, 1))}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[380px] shrink-0 border-l border-gray-200 bg-white">
          <DailyAgenda />
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 border-t border-gray-200 bg-white">
        <StatsFooter
          onCreate={() => {
            if (!selectedDate) {
              alert("Select a date first");
              return;
            }
            setIsDrawerOpen(true);
          }}
        />
      </div>

      {/* DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
          {/* HEADER */}
          <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-10 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create Schedule
              </h2>
              <p className="text-xs text-gray-500">
                Professional multi-platform publishing
              </p>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-400 hover:text-gray-700 text-xl transition"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="flex flex-1 overflow-hidden">
            {/* LEFT – PLATFORM PANEL */}
            <div className="w-[280px] bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Platforms
                </p>

                <div className="space-y-3">
                  {targets.map((target) => {
                    const isActive = selectedTargets.includes(target.id);

                    return (
                      <button
                        key={target.id}
                        onClick={() =>
                          setSelectedTargets((prev) =>
                            prev.includes(target.id)
                              ? prev.filter((id) => id !== target.id)
                              : [...prev, target.id],
                          )
                        }
                        style={{
                          background: isActive
                            ? target.ui?.brand_color || "#2563eb"
                            : "#F9FAFB",
                          color: isActive ? "#ffffff" : "#111827",
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border border-transparent hover:shadow-md"
                      >
                        {target.ui?.logo && (
                          <img src={target.ui.logo} className="w-6 h-6" />
                        )}

                        <div className="text-left flex-1">
                          <div className="text-sm font-semibold capitalize">
                            {target.provider}
                          </div>
                          <div
                            className={`text-xs ${
                              isActive ? "text-white/80" : "text-gray-500"
                            }`}
                          >
                            {target.display_name}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SCHEDULE CARD */}
              <div className="mt-auto bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">Schedule</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={scheduledTime?.slice(0, 10)}
                      onChange={(e) => {
                        const timePart =
                          scheduledTime?.slice(11, 16) || "10:00";
                        setScheduledTime(`${e.target.value}T${timePart}`);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={scheduledTime?.slice(11, 16)}
                      onChange={(e) => {
                        const datePart = scheduledTime?.slice(0, 10);
                        setScheduledTime(`${datePart}T${e.target.value}`);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER – CONTENT + MEDIA */}
            <div className="flex-1 flex p-10 gap-8">
              {/* CONTENT EDITOR */}
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Content
                  </p>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                  placeholder="Write long-form content...
Use spacing, paragraphs and structure.

Future AI tools will enhance this section."
                />
              </div>

              {/* MEDIA + PREVIEW */}
              <div className="w-[380px] flex flex-col gap-6">
                {/* MEDIA CARD */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    Media
                  </p>

                  {selectedTargets.map((id) => {
                    const target = targets.find((t) => t.id === id);
                    if (!target) return null;

                    const provider = target.provider;
                    const media = platformMedia[id] || {};

                    return (
                      <div key={id} className="mb-4">
                        <p className="text-xs text-gray-500 mb-2 capitalize">
                          {provider} media
                        </p>

                        
                        {provider === "instagram" && (
                          <div className="mb-3">
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(e) => {
                                const file = e.target.files[0];

                                const isVideo = file?.type.startsWith("video");

                                setPlatformMedia((prev) => ({
                                  ...prev,
                                  [id]: isVideo
                                    ? { video: file }
                                    : { image: file },
                                }));
                              }}
                              className="text-sm"
                            />

                            {media.image && (
                              <img
                                src={URL.createObjectURL(media.image)}
                                className="mt-4 rounded-xl max-h-48 object-cover w-full"
                              />
                            )}

                            {media.video && (
                              <video
                                src={URL.createObjectURL(media.video)}
                                controls
                                className="mt-4 rounded-xl max-h-48 w-full"
                              />
                            )}
                          </div>
                        )}

                        {/* LINKEDIN */}
                        {provider === "linkedin" && (
                          <>
                            {!media.video && (
                              <div className="mb-3">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];

                                    setPlatformMedia((prev) => ({
                                      ...prev,
                                      [id]: { image: file },
                                    }));
                                  }}
                                  className="text-sm"
                                />

                                {media.image && (
                                  <img
                                    src={URL.createObjectURL(media.image)}
                                    className="mt-4 rounded-xl max-h-48 object-cover w-full"
                                  />
                                )}
                              </div>
                            )}

                            {!media.image && (
                              <div>
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];

                                    setPlatformMedia((prev) => ({
                                      ...prev,
                                      [id]: { video: file },
                                    }));
                                  }}
                                  className="text-sm"
                                />

                                {media.video && (
                                  <video
                                    src={URL.createObjectURL(media.video)}
                                    controls
                                    className="mt-4 rounded-xl max-h-48 w-full"
                                  />
                                )}
                              </div>
                            )}
                          </>
                        )}

                        {/* YOUTUBE */}
                        {provider === "youtube" && (
                          <div>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => {
                                const file = e.target.files[0];

                                setPlatformMedia((prev) => ({
                                  ...prev,
                                  [id]: { video: file },
                                }));
                              }}
                              className="text-sm"
                            />

                            {media.video && (
                              <video
                                src={URL.createObjectURL(media.video)}
                                controls
                                className="mt-4 rounded-xl max-h-48 w-full"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* PREVIEW CARD */}
                
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-end px-10 shadow-sm">
            <div className="flex gap-4">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-md"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
