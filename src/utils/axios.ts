import axios from "axios";

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: "http://localhost:5000", // Base URL for your API
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL for your API
});
console.log(
  "process.env.NEXT_PUBLIC_API_BASE_URL: ",
  process.env.NEXT_PUBLIC_API_BASE_URL
);
// Request Interceptor: Attach JWT token to every request (if available)
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle responses (Optional)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle Unauthorized response (e.g., redirect to login page)
      console.error("Token expired or unauthorized");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
