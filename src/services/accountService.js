
import API from "./api";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const socialList = (data) =>
  API.get("social/");

export const linkedinConnect = async () => {
  const response = await api.get("/social/linkedin/connect/");
  return response.data;
};

import api from "./api";

export const metaConnect = async () => {
  const response = await api.get("/social/meta/connect/");
  return response.data;
};
export default API
