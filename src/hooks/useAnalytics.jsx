import { useState, useEffect, useRef } from "react";
import {
  getOverview,
  getEngagementChart,
  getEngagementDistribution,
  getRecentPosts,
} from "../services/analyticsService";

export const useAnalytics = (platform = null) => {

  const loaded = useRef(false);

  const [overview, setOverview] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [engagementDistribution, setEngagementDistribution] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (loaded.current) return;
    loaded.current = true;

    const loadAnalytics = async () => {

      try {

        const [overviewRes, chartRes, distributionRes, recentPostsRes] =
          await Promise.all([
            getOverview(platform),
            getEngagementChart(platform),
            getEngagementDistribution(),
            getRecentPosts(),
          ]);

        setOverview(overviewRes.data);

        const formatted =
          chartRes.data?.map((item) => ({
            date: item.date,
            instagram: Number(item.instagram || 0),
            youtube: Number(item.youtube || 0),
            linkedin: Number(item.linkedin || 0),
          })) || [];

        setChartData(formatted);
        setEngagementDistribution(distributionRes?.data || []);
        setRecentPosts(recentPostsRes?.data || []);

      } catch (error) {

        console.error("Analytics fetch error:", error);

      } finally {

        setLoading(false);

      }

    };

    loadAnalytics();

  }, []);

  return {
    overview,
    chartData,
    engagementDistribution,
    recentPosts,
    loading,
  };
};