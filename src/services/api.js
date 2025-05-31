import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs", error);
    return [];
  }
};

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job details", error);
    return null;
  }
};

export const applyForJob = async (jobId, userData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/${jobId}/apply`, userData);
    return response.data;
  } catch (error) {
    console.error("Error applying for job", error);
    return null;
  }
};
