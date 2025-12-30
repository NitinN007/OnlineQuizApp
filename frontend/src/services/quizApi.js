import axios from 'axios';

const API_BASE = "http://localhost:4000/api";

// Create axios instance with timeout
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

const quizApi = {
  // Get all technologies
  getTechnologies: async () => {
    try {
      console.log("Requesting technologies from:", `${API_BASE}/quiz/technologies`);
      const response = await axiosInstance.get('/quiz/technologies');
      console.log("Technologies response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching technologies:", error.message);
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
      throw error;
    }
  },

  // Get all levels
  getLevels: async () => {
    try {
      console.log("Requesting levels from:", `${API_BASE}/quiz/levels`);
      const response = await axiosInstance.get('/quiz/levels');
      console.log("Levels response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching levels:", error.message);
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      }
      throw error;
    }
  },

  // Get questions for a specific technology and level
  getQuestions: async (technology, level) => {
    try {
      const url = `/quiz/questions?technology=${technology}&level=${level}`;
      console.log("Requesting questions from:", `${API_BASE}${url}`);
      const response = await axiosInstance.get(url);
      console.log("Questions response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error.message);
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response received - backend might be down");
      }
      throw error;
    }
  },

  // Submit quiz result
  submitResult: async (resultData, token) => {
    try {
      const response = await axiosInstance.post(
        '/result',
        resultData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting result:", error);
      throw error;
    }
  },

  // Get user's quiz results
  getUserResults: async (token) => {
    try {
      const response = await axiosInstance.get(
        '/result',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching results:", error);
      throw error;
    }
  }
};

export default quizApi;
