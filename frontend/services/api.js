// axios instance
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend is on another URL
  headers: {
    "Content-Type": "application/json"
  }
});

// attach token
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
