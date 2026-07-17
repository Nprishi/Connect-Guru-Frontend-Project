import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { CoursePackage } from "@/types/package";

export const getPackages = async (): Promise<CoursePackage[]> => {
  const { data } = await apiClient.get<CoursePackage[]>(
    API_ENDPOINTS.packages.list,
  );

  return data;
};

export const getTeacherPackages = async (
  teacherId: string,
): Promise<CoursePackage[]> => {
  const { data } = await apiClient.get<CoursePackage[]>(
    API_ENDPOINTS.packages.teacher(teacherId),
  );

  return data;
};

export const getPackageById = async (
  packageId: string,
): Promise<CoursePackage> => {
  const { data } = await apiClient.get<CoursePackage>(
    API_ENDPOINTS.packages.detail(packageId),
  );

  return data;
};
