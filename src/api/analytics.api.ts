import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  StudentAnalytics,
  TeacherAnalytics,
  AdminAnalytics,
} from "@/types/analytics";

export const getStudentAnalytics = async (): Promise<StudentAnalytics> => {
  const { data } = await apiClient.get<StudentAnalytics>(
    API_ENDPOINTS.analytics.student,
  );

  return data;
};

export const getTeacherAnalytics = async (): Promise<TeacherAnalytics> => {
  const { data } = await apiClient.get<TeacherAnalytics>(
    API_ENDPOINTS.analytics.teacher,
  );

  return data;
};

export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
  const { data } = await apiClient.get<AdminAnalytics>(
    API_ENDPOINTS.analytics.admin,
  );

  return data;
};
