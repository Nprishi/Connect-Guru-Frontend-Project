import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Payment,
  CreatePaymentPayload,
  UpdatePaymentStatusPayload,
} from "@/types/payment";

const normalizePayment = (value: unknown): Payment => {
  if (!value || typeof value !== "object") {
    return value as Payment;
  }

  const entry = value as Record<string, unknown>;

  if (entry.payment && typeof entry.payment === "object") {
    return entry.payment as Payment;
  }

  if (entry.data && typeof entry.data === "object") {
    const nested = entry.data as Record<string, unknown>;

    if (nested.payment && typeof nested.payment === "object") {
      return nested.payment as Payment;
    }

    if (nested._id || nested.teacherId || nested.amount || nested.transactionId) {
      return nested as unknown as Payment;
    }
  }

  return value as Payment;
};

export const createPayment = async (
  payload: CreatePaymentPayload,
): Promise<Payment> => {
  const { data } = await apiClient.post<unknown>(
    API_ENDPOINTS.payments.create,
    payload,
  );

  return normalizePayment(data);
};

export const getPayments = async (): Promise<Payment[]> => {
  const { data } = await apiClient.get<unknown>(API_ENDPOINTS.payments.list);

  if (Array.isArray(data)) {
    return data as Payment[];
  }

  if (data && typeof data === "object") {
    const response = data as Record<string, unknown>;
    const maybeArray = response.payments ?? response.data ?? response.items;

    if (Array.isArray(maybeArray)) {
      return maybeArray as Payment[];
    }
  }

  return [];
};

export const updatePaymentStatus = async (
  paymentId: string,
  payload: UpdatePaymentStatusPayload,
): Promise<Payment> => {
  const { data } = await apiClient.put<Payment>(
    API_ENDPOINTS.payments.updateStatus(paymentId),
    payload,
  );

  return data;
};
