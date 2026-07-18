export interface Session {
  _id: string;
  bookingId: string;
  teacherId: string;
  studentId: string;
  status: string;
  startTime?: string;
  endTime?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionPayload {
  bookingId: string;
  meetingLink?: string;
  startTime: string;
}
