import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// Request Interceptor
// =========================

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// Response Interceptor
// =========================

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      toast.error("Network Error");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data?.message || "Bad Request");
        break;

      case 401:
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.error("Session Expired");

        if (
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }

        break;

      case 403:
        toast.error("Access Denied");
        break;

      case 404:
        toast.error(data?.message || "Resource Not Found");
        break;

      case 500:
        toast.error("Internal Server Error");
        break;

      default:
        toast.error(data?.message || "Something went wrong");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;