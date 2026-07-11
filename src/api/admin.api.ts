import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";

export async function getAdminDashboard() {
  return apiClient.get(API_ENDPOINTS.admin.dashboard);
}
