/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface StudentSettings {
  notifications: boolean;
  emailUpdates: boolean;
}

export interface StudentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
  phone: string;
  status: string;
  avatar: string | null;

  rating: number;
  totalReviews: number;

  isEmailVerified: boolean;
  emailVerificationAttempts: number;
  emailVerificationOtpExpiresAt: string | null;
  emailVerificationLastSentAt: string | null;
  resetPasswordExpiresAt: string | null;
  lastLogin: string | null;

  settings: StudentSettings;

  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  _id: string;
  userId: string;

  preferredSubjects: string[];
  learningGoals: string[];
  interests: string[];
  bio: string;

  createdAt: string;
  updatedAt: string;
}

export interface StudentProfileResponse {
  message: string;
  data: StudentProfile;
}

export interface CurrentStudentResponse {
  message: string;
  data: {
    profile: StudentProfile;
    user: StudentUser;
  };
}

export interface StudentDashboardStats {
  totalTeachers: number;
  totalBookings: number;
  activePackages: number;
  completedSessions: number;
  upcomingSessions: number;
  unreadNotifications: number;
}

export interface RecommendedTeacherProfile {
  _id: string;
  userId: string;

  subjects: string[];
  education: string[];
  experience: string[];
  availability: string[];

  hourlyRate: number;
  bio: string;

  createdAt: string;
  updatedAt: string;
}

export interface RecommendedTeacherUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;

  role: string;
  gender: string;
  phone: string;
  status: string;

  avatar: string | null;

  lastLogin: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface RecommendedTeacher {
  _id: string;
  userId: string;

  subjects: string[];
  education: string[];
  experience: string[];
  availability: string[];

  hourlyRate: number;
  bio: string;

  createdAt: string;
  updatedAt: string;

  user: RecommendedTeacherUser;
}

export interface StudentDashboardResponse {
  message: string;
  data: {
    profile: StudentProfile & {
      user: StudentUser;
    };

    stats: StudentDashboardStats;

    recentBookings: Record<string, unknown>[];

    recommendedTeachers: RecommendedTeacher[];

    upcomingSessions: Record<string, unknown>[];
  };
}

export interface CreateStudentProfilePayload {
  preferredSubjects: string[];
  learningGoals: string[];
  interests: string[];
  bio: string;
}

export interface UpdateStudentProfilePayload extends Partial<CreateStudentProfilePayload> {}
