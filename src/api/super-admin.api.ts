import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  SuperAdminLoginPayload,
  SuperAdminAuthResponse,
} from "@/types/super-admin";

export const loginSuperAdmin = async (
  payload: SuperAdminLoginPayload,
): Promise<SuperAdminAuthResponse> => {
  const { data } = await apiClient.post<SuperAdminAuthResponse>(
    API_ENDPOINTS.superAdmin.login,
    payload,
  );

  return data;
};
