import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

type AuthApiResponse = {
  message: string;
  data: AuthResponse;
};

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthApiResponse>(
    API_ENDPOINTS.auth.register,
    payload,
  );

  return data.data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthApiResponse>(
    API_ENDPOINTS.auth.login,
    payload,
  );

  return data.data;
}

export async function logoutUser(): Promise<void> {
  await apiClient.post(API_ENDPOINTS.auth.logout);
}

export async function getProfile(): Promise<AuthResponse["user"]> {
  const { data } = await apiClient.get<AuthResponse["user"]>(
    API_ENDPOINTS.auth.profile,
  );

  return data;
}
