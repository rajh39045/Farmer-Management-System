import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const body = response.data;

    if (
      body &&
      typeof body === "object" &&
      body.success === true
    ) {
      if (Object.prototype.hasOwnProperty.call(body, "data")) {
        response.data = body.data;
      }

      response.message = body.message;
    }

    return response;
  },

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

        if (window.location.pathname !== "/login") {
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
