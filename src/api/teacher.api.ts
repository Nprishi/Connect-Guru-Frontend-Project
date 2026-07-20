import axios from "axios";

import apiClient from "@/api/axios";
import { searchTeachers } from "@/api/search.api";
import { API_ENDPOINTS } from "@/constants/api";

import type {
  TeacherAvailabilityPayload,
  TeacherListItem,
  TeacherProfileResponse,
  TeacherListResponse,
  TeacherOverviewResponse,
  TeacherStudentsResponse,
} from "@/types/teacher";
import type { ApiResponse } from "@/types/api";

export const getTeachers = async (
  subject?: string,
): Promise<TeacherListResponse> => {
  const params = new URLSearchParams({ page: "1", limit: "100" });

  if (subject) {
    params.set("subject", subject);
  }

  const query = params.toString() ? `?${params.toString()}` : "";

  const { data } = await apiClient.get<TeacherListResponse>(
    `${API_ENDPOINTS.teachers.list}${query}`,
  );

  if (Array.isArray(data?.data?.teachers) && data.data.teachers.length > 0) {
    return data;
  }

  try {
    const searchResult = await searchTeachers({
      q: subject ?? "",
      page: 1,
      limit: 100,
    });

    const teachers = Array.isArray(searchResult.items)
      ? (searchResult.items as TeacherListItem[])
      : [];

    if (teachers.length > 0) {
      return {
        message: data?.message ?? "Success",
        data: {
          teachers,
          page: 1,
          limit: 100,
        },
      };
    }
  } catch {
    return data;
  }

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

export const getCurrentTeacherProfile = async (): Promise<TeacherProfileResponse> => {
  const { data } = await apiClient.get<TeacherProfileResponse>(
    API_ENDPOINTS.teachers.current,
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
