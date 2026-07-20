export interface TeacherProfile {
  _id: string;
  userId: string;
  subjects: string[];
  education: string[];
  experience: string[];
  availability: string[];
  hourlyRate: number;
  bio: string;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherSettings {
  notifications: boolean;
  emailUpdates: boolean;
}

export interface TeacherUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  avatar?: string | null;
  status: string;

  rating: number;
  totalReviews: number;

  isEmailVerified: boolean;
  emailVerificationAttempts: number;
  emailVerificationOtpExpiresAt: string | null;
  emailVerificationLastSentAt: string | null;
  resetPasswordExpiresAt: string | null;
  lastLogin: string | null;

  settings: TeacherSettings;

  createdAt: string;
  updatedAt: string;
}

export interface TeacherProfileResponse {
  message: string;
  data: {
    profile: TeacherProfile;
    user: TeacherUser;
  };
}

export interface TeacherOverview {
  totalStudents?: number;
  pendingRequests?: number;
  monthlyEarnings?: number;
  upcomingSessions?: number;
  confirmedBookings?: number;
  todaySessions?: number;
}

export interface TeacherOverviewResponse {
  message: string;
  data: TeacherOverview;
}

export interface TeacherAvailabilityPayload {
  availability: string[];
}

export interface TeacherStudent {
  _id: string;
  user?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string | null;
    status?: string;
  };
  status?: string;
  packageName?: string;
  progress?: number;
  lastClass?: string;
  nextClass?: string;
}

export interface TeacherStudentsResponse {
  message: string;
  data: TeacherStudent[];
}

export interface TeacherListItem {
  profile: TeacherProfile;
  user: TeacherUser;
}

export interface TeacherListResponse {
  message: string;
  data: {
    teachers: TeacherListItem[];
    page: number;
    limit: number;
  };
}
