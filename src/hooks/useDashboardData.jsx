import { useEffect, useState } from "react";
import API from "../services/api";

export function useDashboardData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cacheKey = "dashboard_full_cache";
    const cacheTsKey = "dashboard_full_cache_ts";
    const now = Date.now();

    const cached = sessionStorage.getItem(cacheKey);
    const cachedTs = Number(sessionStorage.getItem(cacheTsKey) || 0);

    if (cached && now - cachedTs < 30 * 1000) {
      setData(JSON.parse(cached));
      return;
    }

    API.get("/analytics/dashboard/full/")
      .then((res) => {
        setData(res.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
        sessionStorage.setItem(cacheTsKey, String(Date.now()));
      })
      .catch((err) => console.error(err));
  }, []);

  return data;
}
