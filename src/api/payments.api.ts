import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Payment,
  CreatePaymentPayload,
  UpdatePaymentStatusPayload,
} from "@/types/payment";

export const createPayment = async (
  payload: CreatePaymentPayload,
): Promise<Payment> => {
  const { data } = await apiClient.post<Payment>(
    API_ENDPOINTS.payments.create,
    payload,
  );

  return data;
};

export const getPayments = async (): Promise<Payment[]> => {
  const { data } = await apiClient.get<Payment[]>(API_ENDPOINTS.payments.list);

  return data;
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
