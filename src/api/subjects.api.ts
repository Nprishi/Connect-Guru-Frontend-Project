import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Subject,
  CreateSubjectPayload,
  UpdateSubjectPayload,
} from "@/types/subject";

export const createSubject = async (
  payload: CreateSubjectPayload,
): Promise<Subject> => {
  const { data } = await apiClient.post<Subject>(
    API_ENDPOINTS.subjects.create,
    payload,
  );

  return data;
};

export const getSubjects = async (): Promise<Subject[]> => {
  const { data } = await apiClient.get<Subject[]>(API_ENDPOINTS.subjects.list);

  return data;
};

export const getSubjectById = async (subjectId: string): Promise<Subject> => {
  const { data } = await apiClient.get<Subject>(
    API_ENDPOINTS.subjects.detail(subjectId),
  );

  return data;
};

export const updateSubject = async (
  subjectId: string,
  payload: UpdateSubjectPayload,
): Promise<Subject> => {
  const { data } = await apiClient.patch<Subject>(
    API_ENDPOINTS.subjects.update(subjectId),
    payload,
  );

  return data;
};

export const deleteSubject = async (subjectId: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.subjects.delete(subjectId));
};
