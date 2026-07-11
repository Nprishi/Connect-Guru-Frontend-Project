import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { UserProfile } from "@/types/user";

export async function getAdminUsers() {
  return apiClient.get<UserProfile[]>(API_ENDPOINTS.admin.users);
}
