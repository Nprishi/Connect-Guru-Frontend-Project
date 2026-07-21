const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE_URL = (() => {
  if (!rawApiBaseUrl) {
    return "http://localhost:5000/api/cg";
  }

  const normalized = rawApiBaseUrl.replace(/\/+$/, "");

  if (normalized.endsWith("/api/cg")) {
    return normalized;
  }

  if (normalized.endsWith("/api")) {
    return `${normalized}/cg`;
  }

  return `${normalized}/api/cg`;
})();

export const API_ENDPOINTS = {
  superAdmin: {
    login: "/superadmin/t1/login",
  },

  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    updateUserStatus: (userId: string) => `/admin/users/${userId}/status`,
  },

  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh-token",
    logout: "/auth/logout",
    profile: "/auth/profile",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
    verifyEmail: "/auth/verify-email",
    resendVerification: "/auth/resend-verification",
  },

  users: {
    profile: "/users/profile",
    settings: "/users/settings",
    avatar: "/users/avatar",
    account: "/users/account",
  },

  teachers: {
    list: "/teachers",
    profile: "/teachers/profile",
    current: "/teachers/me",
    dashboard: "/teachers/dashboard",
    availability: "/teachers/availability",
    students: "/teachers/students",
    reviews: "/teachers/reviews",
    publicProfile: (userId: string) => `/teachers/profile/${userId}`,
  },

  students: {
    profile: "/students/profile",
    current: "/students/me",
    dashboard: "/students/dashboard",
    publicProfile: (userId: string) => `/students/profile/${userId}`,
  },

  search: {
    global: "/search",
    teachers: "/search/teachers",
    packages: "/search/packages",
    recommendations: "/search/recommendations",
  },

  packages: {
    list: "/packages",
    create: "/packages",
    current: "/packages/me",
    teacher: (teacherId: string) => `/packages/teacher/${teacherId}`,
    detail: (packageId: string) => `/packages/${packageId}`,
  },

  bookings: {
    list: "/bookings",
    create: "/bookings",
    updateStatus: (bookingId: string) => `/bookings/${bookingId}/status`,
  },

  chat: {
    conversations: "/chat/conversations",
    sendMessage: "/chat/messages",
    messages: (conversationId: string) => `/chat/messages/${conversationId}`,
  },

  payments: {
    create: "/payments",
    list: "/payments",
    updateStatus: (paymentId: string) => `/payments/${paymentId}/status`,
  },

  analytics: {
    student: "/analytics/student",
    teacher: "/analytics/teacher",
    admin: "/analytics/admin",
  },

  kyc: {
    submit: "/kyc",
    upload: "/kyc/upload",
    current: "/kyc",
    admin: "/kyc/admin",
    review: (kycId: string) => `/kyc/${kycId}/review`,
  },

  categories: {
    create: "/categories",
    list: "/categories",
    detail: (categoryId: string) => `/categories/${categoryId}`,
    update: (categoryId: string) => `/categories/${categoryId}`,
    delete: (categoryId: string) => `/categories/${categoryId}`,
  },

  subjects: {
    create: "/subjects",
    list: "/subjects",
    detail: (subjectId: string) => `/subjects/${subjectId}`,
    update: (subjectId: string) => `/subjects/${subjectId}`,
    delete: (subjectId: string) => `/subjects/${subjectId}`,
  },

  notifications: {
    list: "/notifications",
    unreadCount: "/notifications/unread-count",
    readAll: "/notifications/read-all",
    read: (notificationId: string) => `/notifications/${notificationId}/read`,
    detail: (notificationId: string) => `/notifications/${notificationId}`,
  },

  sessions: {
    create: "/sessions",
    list: "/sessions",
    student: "/sessions/student",
    teacher: "/sessions/teacher",
    start: (sessionId: string) => `/sessions/${sessionId}/start`,
    end: (sessionId: string) => `/sessions/${sessionId}/end`,
    cancel: (sessionId: string) => `/sessions/${sessionId}/cancel`,
  },

  reviews: {
    create: "/reviews",
    list: "/reviews",
    teacher: (teacherId: string) => `/reviews/teacher/${teacherId}`,
    update: (reviewId: string) => `/reviews/${reviewId}`,
    delete: (reviewId: string) => `/reviews/${reviewId}`,
  },
} as const;
