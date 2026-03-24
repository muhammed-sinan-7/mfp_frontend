import { useState, useEffect, useRef } from "react";
import {
  getInstagramOverview,
  getInstagramGrowth,
  getInstagramTopPosts,
  getInstagramPerformance,
} from "../services/analyticsService";

export const useInstagramAnalytics = () => {
  const loaded = useRef(false);

  const [overview, setOverview] = useState(null);
  const [growth, setGrowth] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const load = async () => {
      const [overviewRes, growthRes, topRes, performanceRes] =
        await Promise.all([
          getInstagramOverview(),
          getInstagramGrowth(),
          getInstagramTopPosts(),
          getInstagramPerformance(),
        ]);

      setOverview(overviewRes.data);
      setGrowth(
        (growthRes.data || []).map((g) => {
          const dt = new Date(g.day);

          return {
            ...g,
            dateLabel: dt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          };
        }),
      );
      setTopPosts(topRes.data);
      setPerformance(performanceRes.data);
    };

    load();
  }, []);

  return {
    overview,
    growth,
    topPosts,
    performance,
  };
};
