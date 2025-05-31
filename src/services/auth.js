import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    return null;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  return localStorage.getItem("token");
};
