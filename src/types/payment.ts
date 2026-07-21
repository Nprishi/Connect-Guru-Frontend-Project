export interface Payment {
  _id: string;
  teacherId: string;
  packageId?: string;
  bookingId?: string;
  amount: number;
  transactionId: string;
  method?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  teacherId: string;
  packageId?: string;
  bookingId?: string;
  amount: number;
  transactionId: string;
  method?: string;
}

export interface UpdatePaymentStatusPayload {
  status: string;
}
