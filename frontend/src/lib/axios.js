import axios from "axios";
// this is an axios instance that can be used throughout the application
// to make API calls to the backend server
// it has a base URL set to the backend server's API endpoint

// in production, no localhost so we have to make this dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Store reference to getToken function - will be set by setupAxiosInterceptors
let getTokenFunction = null;

// Setup function to be called from App component with Clerk's getToken
export const setupAxiosInterceptors = (getToken) => {
  getTokenFunction = getToken;
};

// Request interceptor to automatically add Clerk token
api.interceptors.request.use(
  async (config) => {
    // Only add token for protected routes (our API routes)
    if (config.url && !config.url.includes("clerk") && getTokenFunction) {
      try {
        const token = await getTokenFunction();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        // Failed to get Clerk token: continue without token
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Authentication required - let caller handle it
    }
    return Promise.reject(error);
  },
);

export default api;
