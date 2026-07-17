import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { UserProfile } from "@/types/user";

export const getAdminUsers = async (): Promise<UserProfile[]> => {
  const { data } = await apiClient.get<UserProfile[]>(
    API_ENDPOINTS.admin.users,
  );

  return data;
};
