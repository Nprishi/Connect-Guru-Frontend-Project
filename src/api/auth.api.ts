import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

type AuthApiResponse = {
  message: string;
  data: AuthResponse;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthApiResponse>(
    API_ENDPOINTS.auth.register,
    payload,
  );

  return data.data;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthApiResponse>(
    API_ENDPOINTS.auth.login,
    payload,
  );

  return data.data;
};

export const logoutUser = async () => {
  const { data } = await apiClient.post(API_ENDPOINTS.auth.logout);

  return data;
};

export const getProfile = async (): Promise<AuthResponse["user"]> => {
  const { data } = await apiClient.get<AuthResponse["user"]>(
    API_ENDPOINTS.auth.profile,
  );

  return data;
};
