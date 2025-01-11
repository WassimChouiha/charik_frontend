import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set the base URL
  headers: {
    "Content-Type": "application/json", // Common headers
  },
  // You can add other default configurations here, e.g., timeout, interceptors, etc.
});

export default api;
