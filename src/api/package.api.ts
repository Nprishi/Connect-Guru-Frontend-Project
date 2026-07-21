import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  CreatePackagePayload,
  Package,
  PackageResponse,
  PackagesResponse,
  UpdatePackagePayload,
} from "@/types/package";

const normalizePackageList = (value: unknown): Package[] => {
  if (Array.isArray(value)) {
    return value as Package[];
  }

  if (value && typeof value === "object") {
    const record = value as { data?: unknown; packages?: unknown };
    const nested = record.data ?? record.packages;

    if (Array.isArray(nested)) {
      return nested as Package[];
    }
  }

  return [];
};

export const getPackages = async (): Promise<Package[]> => {
  const { data } = await apiClient.get<PackagesResponse>(
    API_ENDPOINTS.packages.list,
  );

  return normalizePackageList(data?.data ?? data);
};

export const getCurrentTeacherPackages = async (): Promise<Package[]> => {
  const { data } = await apiClient.get<PackagesResponse>(
    API_ENDPOINTS.packages.current,
  );

  return normalizePackageList(data?.data ?? data);
};

export const getTeacherPackages = async (
  teacherId: string,
): Promise<Package[]> => {
  const { data } = await apiClient.get<PackagesResponse>(
    API_ENDPOINTS.packages.teacher(teacherId),
  );

  return normalizePackageList(data?.data ?? data);
};

export const getPackage = async (packageId: string): Promise<Package> => {
  const { data } = await apiClient.get<PackageResponse>(
    API_ENDPOINTS.packages.detail(packageId),
  );

  return (data?.data ?? data) as Package;
};

export const createPackage = async (
  payload: CreatePackagePayload,
): Promise<Package> => {
  const { data } = await apiClient.post<PackageResponse>(
    API_ENDPOINTS.packages.create,
    payload,
  );

  return (data?.data ?? data) as Package;
};

export const updatePackage = async (
  packageId: string,
  payload: UpdatePackagePayload,
): Promise<Package> => {
  const { data } = await apiClient.patch<PackageResponse>(
    API_ENDPOINTS.packages.detail(packageId),
    payload,
  );

  return (data?.data ?? data) as Package;
};

export const deletePackage = async (packageId: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.packages.detail(packageId));
};

export const getPackageById = getPackage;
