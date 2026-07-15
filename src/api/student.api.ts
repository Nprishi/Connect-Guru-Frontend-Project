import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { StudentProfile } from "@/types/student";

export async function createStudentProfile(payload: Partial<StudentProfile>) {
  return apiClient.post<StudentProfile>(
    API_ENDPOINTS.students.profile,
    payload,
  );
}

export async function getStudentProfile(userId: string) {
  return apiClient.get<StudentProfile>(
    `${API_ENDPOINTS.students.profile}/${userId}`,
  );
}
