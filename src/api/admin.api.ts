import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";

export const getDashboard = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.admin.dashboard);
  return data;
};

export const getUsers = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.admin.users);
  return data;
};

export const updateUserStatus = async (userId: string, status: string) => {
  const { data } = await apiClient.put(API_ENDPOINTS.admin.userStatus(userId), {
    status,
  });

  return data;
};
