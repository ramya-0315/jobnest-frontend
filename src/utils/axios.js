// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
});

// ✅ Attach token from localStorage (trimmed)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.trim(); // ✅ Prevent whitespace error
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
