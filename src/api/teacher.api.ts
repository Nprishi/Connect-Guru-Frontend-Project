import axios from "axios";

import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { TeacherProfile } from "@/types/teacher";

export const getTeachers = async (
  subject?: string,
): Promise<TeacherProfile[]> => {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";

  const { data } = await apiClient.get<TeacherProfile[]>(
    `${API_ENDPOINTS.teachers.list}${query}`,
  );

  return data;
};

export const getTeacherProfile = async (
  userId: string,
): Promise<TeacherProfile> => {
  const { data } = await apiClient.get<TeacherProfile>(
    API_ENDPOINTS.teachers.profile(userId),
  );

  return data;
};

export const getTeacherOverview = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.teachers.dashboard);

  return data;
};

export const getTeacherStudents = async (
  teacherId?: string,
): Promise<unknown[]> => {
  if (!teacherId) {
    return [];
  }

  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.teachers.studentsById(teacherId),
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    throw error;
  }
};
