import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { TeacherProfile } from "@/types/teacher";

export async function getTeachers(subject?: string) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return apiClient.get<TeacherProfile[]>(`${API_ENDPOINTS.teachers.list}${query}`);
}

export async function getTeacherProfile(userId: string) {
  return apiClient.get<TeacherProfile>(API_ENDPOINTS.teachers.profile(userId));
}
