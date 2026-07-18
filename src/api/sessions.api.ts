import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { Session, CreateSessionPayload } from "@/types/session";

export const createSession = async (
  payload: CreateSessionPayload,
): Promise<Session> => {
  const { data } = await apiClient.post<Session>(
    API_ENDPOINTS.sessions.create,
    payload,
  );

  return data;
};

export const getSessions = async (): Promise<Session[]> => {
  const { data } = await apiClient.get<Session[]>(API_ENDPOINTS.sessions.list);

  return data;
};

export const getStudentSessions = async (): Promise<Session[]> => {
  const { data } = await apiClient.get<Session[]>(
    API_ENDPOINTS.sessions.student,
  );

  return data;
};

export const getTeacherSessions = async (): Promise<Session[]> => {
  const { data } = await apiClient.get<Session[]>(
    API_ENDPOINTS.sessions.teacher,
  );

  return data;
};

export const startSession = async (sessionId: string): Promise<Session> => {
  const { data } = await apiClient.patch<Session>(
    API_ENDPOINTS.sessions.start(sessionId),
  );

  return data;
};

export const endSession = async (sessionId: string): Promise<Session> => {
  const { data } = await apiClient.patch<Session>(
    API_ENDPOINTS.sessions.end(sessionId),
  );

  return data;
};

export const cancelSession = async (sessionId: string): Promise<Session> => {
  const { data } = await apiClient.patch<Session>(
    API_ENDPOINTS.sessions.cancel(sessionId),
  );

  return data;
};
