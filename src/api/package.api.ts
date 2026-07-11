import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { CoursePackage } from "@/types/package";

export async function getPackages() {
  return apiClient.get<CoursePackage[]>(API_ENDPOINTS.packages.list);
}

export async function getTeacherPackages(teacherId: string) {
  return apiClient.get<CoursePackage[]>(API_ENDPOINTS.packages.teacher(teacherId));
}

export async function getPackageById(packageId: string) {
  return apiClient.get<CoursePackage>(API_ENDPOINTS.packages.detail(packageId));
}
