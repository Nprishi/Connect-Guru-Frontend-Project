import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { StudentProfile } from "@/types/student";

export const createStudentProfile = async (
  payload: Partial<StudentProfile>,
): Promise<StudentProfile> => {
  const { data } = await apiClient.post<StudentProfile>(
    API_ENDPOINTS.students.createProfile,
    payload,
  );

  return data;
};

export const getStudentProfile = async (
  userId: string,
): Promise<StudentProfile> => {
  const { data } = await apiClient.get<StudentProfile>(
    API_ENDPOINTS.students.profile(userId),
  );

  return data;
};
