import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
import { getStoredAuth } from "@/lib/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const auth = getStoredAuth();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

export default api;
