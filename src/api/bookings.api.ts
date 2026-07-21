import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Booking,
  CreateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/types/bookings";

const normalizeBooking = (value: unknown): Booking => {
  if (!value || typeof value !== "object") {
    return value as Booking;
  }

  const entry = value as Record<string, unknown>;

  if (entry.booking && typeof entry.booking === "object") {
    return entry.booking as Booking;
  }

  if (entry.data && typeof entry.data === "object") {
    const nested = entry.data as Record<string, unknown>;

    if (nested.booking && typeof nested.booking === "object") {
      return nested.booking as Booking;
    }

    if (nested._id || nested.teacherId || nested.studentId || nested.status) {
      return nested as unknown as Booking;
    }
  }

  return value as Booking;
};

export const createBooking = async (
  payload: CreateBookingPayload,
): Promise<Booking> => {
  const { data } = await apiClient.post<unknown>(
    API_ENDPOINTS.bookings.create,
    payload,
  );

  return normalizeBooking(data);
};

export const getBookings = async (): Promise<Booking[]> => {
  const { data } = await apiClient.get<unknown>(API_ENDPOINTS.bookings.list);

  if (Array.isArray(data)) {
    return data as Booking[];
  }

  if (data && typeof data === "object") {
    const maybeArray = (data as { bookings?: unknown; data?: unknown }).bookings ?? (data as { bookings?: unknown; data?: unknown }).data;

    if (Array.isArray(maybeArray)) {
      return maybeArray as Booking[];
    }
  }

  return [];
};

export const updateBookingStatus = async (
  bookingId: string,
  payload: UpdateBookingStatusPayload,
): Promise<Booking> => {
  const { data } = await apiClient.put<unknown>(
    API_ENDPOINTS.bookings.updateStatus(bookingId),
    payload,
  );

  return normalizeBooking(data);
};
