import axios from "axios";
// this is an axios instance that can be used throughout the application
// to make API calls to the backend server
// it has a base URL set to the backend server's API endpoint
const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export default api;
