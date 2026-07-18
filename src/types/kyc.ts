export interface Kyc {
  _id: string;
  documentType: string;
  documentUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitKycPayload {
  documentType: string;
  documentUrl: string;
}

export interface ReviewKycPayload {
  status: string;
  remarks?: string;
}
