import axios from "axios";

import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";

import type {
  TeacherAvailabilityPayload,
  TeacherProfileResponse,
  TeacherListResponse,
  TeacherOverviewResponse,
  TeacherStudentsResponse,
} from "@/types/teacher";
import type { ApiResponse } from "@/types/api";

export const getTeachers = async (
  subject?: string,
): Promise<TeacherListResponse> => {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";

  const { data } = await apiClient.get<TeacherListResponse>(
    `${API_ENDPOINTS.teachers.list}${query}`,
  );

  return data;
};

export const getTeacherProfile = async (
  userId: string,
): Promise<TeacherProfileResponse> => {
  const { data } = await apiClient.get<TeacherProfileResponse>(
    API_ENDPOINTS.teachers.publicProfile(userId),
  );

  return data;
};

export const getTeacherOverview = async (): Promise<TeacherOverviewResponse> => {
  const { data } = await apiClient.get<TeacherOverviewResponse>(
    API_ENDPOINTS.teachers.dashboard,
  );

  return data;
};

export const getTeacherStudents = async (): Promise<TeacherStudentsResponse["data"]> => {
  try {
    const { data } = await apiClient.get<TeacherStudentsResponse>(
      API_ENDPOINTS.teachers.students,
    );

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    throw error;
  }
};

export const updateTeacherAvailability = async (
  payload: TeacherAvailabilityPayload,
): Promise<ApiResponse<TeacherAvailabilityPayload>> => {
  const { data } = await apiClient.patch<ApiResponse<TeacherAvailabilityPayload>>(
    API_ENDPOINTS.teachers.availability,
    payload,
  );

  return data;
};
