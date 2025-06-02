// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8081", // fallback for local dev
  withCredentials: true,
});

// ✅ Attach token from localStorage(trimmed)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.trim();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
