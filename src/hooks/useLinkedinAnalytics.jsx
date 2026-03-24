import { useState, useEffect,useRef } from "react";
import {
  getLinkedinOverview,
  getLinkedinGrowth,
  getLinkedinPosts,
} from "../services/analyticsService";

export const useLinkedinAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [growth, setGrowth] = useState([]);
  const [posts, setPosts] = useState([]);
//   const [loaded, setLoaded] = useState(false);

  const loaded = useRef(false);
  useEffect(() => {
    if (loaded) return;


    useEffect(() => {
      if (loaded.current) return;
      loaded.current = true;

      const load = async () => {
        const [o, g, p] = await Promise.all([
          getLinkedinOverview(),
          getLinkedinGrowth(),
          getLinkedinPosts(),
        ]);

        setOverview(o.data);
        setGrowth(g.data);
        setPosts(p.data);
      };

      load();
    }, []);
  }, [loaded]);

  return { overview, growth, posts };
};
