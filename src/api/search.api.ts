import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  GlobalSearchResult,
  TeacherSearchParams,
  TeacherSearchResult,
  PackageSearchParams,
  PackageSearchResult,
  TeacherRecommendation,
} from "@/types/search";

export const search = async (query: string): Promise<GlobalSearchResult> => {
  const { data } = await apiClient.get<GlobalSearchResult>(
    API_ENDPOINTS.search.global,
    {
      params: { q: query },
    },
  );

  return data;
};

export const searchTeachers = async (
  params: TeacherSearchParams,
): Promise<TeacherSearchResult> => {
  const { data } = await apiClient.get<TeacherSearchResult>(
    API_ENDPOINTS.search.teachers,
    {
      params,
    },
  );

  return data;
};

export const searchPackages = async (
  params: PackageSearchParams,
): Promise<PackageSearchResult> => {
  const { data } = await apiClient.get<PackageSearchResult>(
    API_ENDPOINTS.search.packages,
    {
      params,
    },
  );

  return data;
};

export const getRecommendations = async (): Promise<
  TeacherRecommendation[]
> => {
  const { data } = await apiClient.get<TeacherRecommendation[]>(
    API_ENDPOINTS.search.recommendations,
  );

  return data;
};
