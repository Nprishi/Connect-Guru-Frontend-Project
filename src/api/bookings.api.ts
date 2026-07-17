import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Booking,
  CreateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/types/bookings";

export const createBooking = async (
  payload: CreateBookingPayload,
): Promise<Booking> => {
  const { data } = await apiClient.post<Booking>(
    API_ENDPOINTS.bookings.create,
    payload,
  );

  return data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const { data } = await apiClient.get<Booking[]>(API_ENDPOINTS.bookings.list);

  return data;
};

export const updateBookingStatus = async (
  bookingId: string,
  payload: UpdateBookingStatusPayload,
): Promise<Booking> => {
  const { data } = await apiClient.put<Booking>(
    API_ENDPOINTS.bookings.updateStatus(bookingId),
    payload,
  );

  return data;
};
