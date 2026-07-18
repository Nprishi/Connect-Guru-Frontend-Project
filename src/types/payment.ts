export interface Payment {
  _id: string;
  teacherId: string;
  packageId: string;
  amount: number;
  transactionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  teacherId: string;
  packageId: string;
  amount: number;
  transactionId: string;
}

export interface UpdatePaymentStatusPayload {
  status: string;
}
