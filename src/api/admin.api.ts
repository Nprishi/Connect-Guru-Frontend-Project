import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  AdminDashboard,
  AdminUser,
  UpdateUserStatusPayload,
} from "@/types/admin";

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const { data } = await apiClient.get<AdminDashboard>(
    API_ENDPOINTS.admin.dashboard,
  );

  return data;
};

export const getUsers = async (): Promise<AdminUser[]> => {
  const { data } = await apiClient.get<AdminUser[]>(API_ENDPOINTS.admin.users);

  return data;
};

export const updateUserStatus = async (
  userId: string,
  payload: UpdateUserStatusPayload,
): Promise<void> => {
  await apiClient.put(API_ENDPOINTS.admin.updateUserStatus(userId), payload);
};
