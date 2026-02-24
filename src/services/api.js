import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

let isRefreshing = false;
let refreshSubscribers = [];



const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};




const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};




API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  const publicEndpoints = [
    "auth/register/",
    "auth/login/",
    "auth/verify-email-otp/",
    "industries/"
  ];

  const isPublic = publicEndpoints.some((url) =>
    config.url.includes(url)
  );

  if (accessToken && !isPublic) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(API(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE}auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;

        localStorage.setItem("accessToken", newAccessToken);

        API.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        onRefreshed(newAccessToken);

        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
  isRefreshing = false;
  logoutUser();
  return Promise.reject(refreshError);
}
    }

    return Promise.reject(error);
  }
);

function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("orgId");
  window.location.href = "/login";
}

export default API