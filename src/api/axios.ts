import axios from "axios";

import { API_BASE_URL } from "@/constants/api";
import { getStoredAuth } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const storeToken = useAuthStore.getState().accessToken;
    const { accessToken: storedToken } = getStoredAuth();
    const accessToken = storeToken ?? storedToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "Something went wrong.";

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
