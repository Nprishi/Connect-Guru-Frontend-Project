import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";

import type {
  CreateStudentProfilePayload,
  CurrentStudentResponse,
  StudentDashboardResponse,
  StudentProfileResponse,
  UpdateStudentProfilePayload,
} from "@/types/student";

export const createStudentProfile = async (
  payload: CreateStudentProfilePayload,
): Promise<StudentProfileResponse> => {
  const { data } = await apiClient.post<StudentProfileResponse>(
    API_ENDPOINTS.students.profile,
    payload,
  );

  return data;
};


export const updateStudentProfile = async (
  payload: UpdateStudentProfilePayload,
): Promise<StudentProfileResponse> => {
  const { data } = await apiClient.patch<StudentProfileResponse>(
    API_ENDPOINTS.students.profile,
    payload,
  );

  return data;
};

export const getCurrentStudent = async (): Promise<CurrentStudentResponse> => {
  const { data } = await apiClient.get<CurrentStudentResponse>(
    API_ENDPOINTS.students.current,
  );

  return data;
};


export const getStudentDashboard =
  async (): Promise<StudentDashboardResponse> => {
    const { data } = await apiClient.get<StudentDashboardResponse>(
      API_ENDPOINTS.students.dashboard,
    );

    return data;
  };


export const getStudentProfile = async (
  userId: string,
): Promise<CurrentStudentResponse> => {
  const { data } = await apiClient.get<CurrentStudentResponse>(
    API_ENDPOINTS.students.publicProfile(userId),
  );

  return data;
};
