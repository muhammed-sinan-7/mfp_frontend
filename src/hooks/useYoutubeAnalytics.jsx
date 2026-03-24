import { useState, useEffect, useRef } from "react";
import {
  getYoutubeOverview,
  getYoutubeGrowth,
  getYoutubeVideos,
  getYouTubeTrafficSources,
} from "../services/analyticsService";

export const useYoutubeAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [growth, setGrowth] = useState([]);
  const [videos, setVideos] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);

  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const load = async () => {
      const [o, g, v] = await Promise.all([
        getYoutubeOverview(),
        getYoutubeGrowth(),
        getYoutubeVideos(),
      ]);

      setOverview(o.data);
      setGrowth(g.data);
      setVideos(v.data);

      getYouTubeTrafficSources().then((res) => {
        const formattedTraffic = (res.data || []).map((s) => ({
          label: s.label,
          percentage: Number(s.value) || 0,
          width: `${Number(s.value) || 0}%`,
          color: "bg-[#7C3AED]",
        }));

        setTrafficSources(formattedTraffic);
      });
    };

    load();
  }, []);

  return {
    overview,
    growth,
    videos,
    trafficSources,
  };
};
