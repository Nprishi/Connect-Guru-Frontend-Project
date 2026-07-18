import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { Kyc, SubmitKycPayload, ReviewKycPayload } from "@/types/kyc";

export const submitKyc = async (payload: SubmitKycPayload): Promise<Kyc> => {
  const { data } = await apiClient.post<Kyc>(API_ENDPOINTS.kyc.submit, payload);

  return data;
};

export const uploadKycDocument = async (
  file: File,
): Promise<{ documentUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<{ documentUrl: string }>(
    API_ENDPOINTS.kyc.upload,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const getCurrentKyc = async (): Promise<Kyc> => {
  const { data } = await apiClient.get<Kyc>(API_ENDPOINTS.kyc.current);

  return data;
};

export const getAllKyc = async (): Promise<Kyc[]> => {
  const { data } = await apiClient.get<Kyc[]>(API_ENDPOINTS.kyc.admin);

  return data;
};

export const reviewKyc = async (
  kycId: string,
  payload: ReviewKycPayload,
): Promise<Kyc> => {
  const { data } = await apiClient.put<Kyc>(
    API_ENDPOINTS.kyc.review(kycId),
    payload,
  );

  return data;
};
