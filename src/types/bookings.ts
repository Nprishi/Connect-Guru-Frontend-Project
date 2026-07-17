export interface Booking {
  _id: string;
  teacherId: string;
  studentId: string;
  subject: string;
  hourlyRate: number;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  teacherId: string;
  subject: string;
  hourlyRate: number;
  notes?: string;
}

export interface UpdateBookingStatusPayload {
  status: string;
}
