import axios from "axios";
// this is an axios instance that can be used throughout the application
// to make API calls to the backend server
// it has a base URL set to the backend server's API endpoint

// in production, no localhost so we have to make this dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
