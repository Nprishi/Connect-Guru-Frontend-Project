import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@/types/review";

export const createReview = async (
  payload: CreateReviewPayload,
): Promise<Review> => {
  const { data } = await apiClient.post<Review>(
    API_ENDPOINTS.reviews.create,
    payload,
  );

  return data;
};

export const getReviews = async (): Promise<Review[]> => {
  const { data } = await apiClient.get<Review[]>(API_ENDPOINTS.reviews.list);

  return data;
};

export const getTeacherReviews = async (
  teacherId: string,
): Promise<Review[]> => {
  const { data } = await apiClient.get<Review[]>(
    API_ENDPOINTS.reviews.teacher(teacherId),
  );

  return data;
};

export const updateReview = async (
  reviewId: string,
  payload: UpdateReviewPayload,
): Promise<Review> => {
  const { data } = await apiClient.patch<Review>(
    API_ENDPOINTS.reviews.update(reviewId),
    payload,
  );

  return data;
};

export const deleteReview = async (reviewId: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.reviews.delete(reviewId));
};
