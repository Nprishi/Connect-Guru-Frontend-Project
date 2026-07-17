import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { UserProfile } from "@/types/user";

export const getOwnProfile = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>(
    API_ENDPOINTS.users.profile,
  );

  return data;
};
