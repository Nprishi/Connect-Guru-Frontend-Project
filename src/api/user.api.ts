import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { UserProfile } from "@/types/user";

export const getAdminUsers = async (): Promise<UserProfile[]> => {
  const { data } = await apiClient.get<UserProfile[]>(
    API_ENDPOINTS.admin.users,
  );

  return data;
};

export const updateUserAvatar = async (formData: FormData) => {
  const { data } = await apiClient.patch(API_ENDPOINTS.users.avatar, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
