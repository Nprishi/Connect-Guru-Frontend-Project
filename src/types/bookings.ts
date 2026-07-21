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
  packageName?: string;
  package?: {
    name?: string;
    isActive?: boolean;
  };
  student?: {
    user?: {
      _id?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      avatar?: string | null;
    };
    profile?: {
      bio?: string;
      preferredSubjects?: string[];
      learningGoals?: string[];
      interests?: string[];
    };
  };
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
