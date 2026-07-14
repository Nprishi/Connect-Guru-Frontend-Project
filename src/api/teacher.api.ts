import axios from "axios";
import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { TeacherProfile } from "@/types/teacher";
import api from "@/lib/axios";

export async function getTeachers(subject?: string) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return apiClient.get<TeacherProfile[]>(
    `${API_ENDPOINTS.teachers.list}${query}`,
  );
}

export async function getTeacherProfile(userId: string) {
  return apiClient.get<TeacherProfile>(API_ENDPOINTS.teachers.profile(userId));
}

export const getTeacherOverview = () => {
  return api.get("/teachers/dashboard/overview");
};

export async function getTeacherStudents(teacherId?: string) {
  const endpoints = [] as string[];

  if (teacherId) {
    endpoints.push(API_ENDPOINTS.teachers.studentsById(teacherId));
  }

  endpoints.push(API_ENDPOINTS.teachers.students);
  endpoints.push("/teacher/students");

  for (const endpoint of endpoints) {
    try {
      return await apiClient.get(endpoint);
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }
  }

  return apiClient.get(API_ENDPOINTS.teachers.students);
}
