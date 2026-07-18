import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/types/category";

export const createCategory = async (
  payload: CreateCategoryPayload,
): Promise<Category> => {
  const { data } = await apiClient.post<Category>(
    API_ENDPOINTS.categories.create,
    payload,
  );

  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await apiClient.get<Category[]>(
    API_ENDPOINTS.categories.list,
  );

  return data;
};

export const getCategoryById = async (
  categoryId: string,
): Promise<Category> => {
  const { data } = await apiClient.get<Category>(
    API_ENDPOINTS.categories.detail(categoryId),
  );

  return data;
};

export const updateCategory = async (
  categoryId: string,
  payload: UpdateCategoryPayload,
): Promise<Category> => {
  const { data } = await apiClient.patch<Category>(
    API_ENDPOINTS.categories.update(categoryId),
    payload,
  );

  return data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.categories.delete(categoryId));
};
