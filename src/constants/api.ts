export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/cg";

export const API_ENDPOINTS = {
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

  superAdmin: {
    login: "/superadmin/t1/login",
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
    messages: (conversationId: string) => `/chat/messages/${conversationId}`,
    sendMessage: "/chat/messages",
  },

  payments: {
    list: "/payments",
    create: "/payments",
    status: (paymentId: string) => `/payments/${paymentId}/status`,
  },

  analytics: {
    student: "/analytics/student",
    teacher: "/analytics/teacher",
    admin: "/analytics/admin",
  },

  kyc: {
    current: "/kyc",
    submit: "/kyc",
    upload: "/kyc/upload",
    admin: "/kyc/admin",
    review: (kycId: string) => `/kyc/${kycId}/review`,
  },

  categories: {
    list: "/categories",
    create: "/categories",
    detail: (categoryId: string) => `/categories/${categoryId}`,
  },

  subjects: {
    list: "/subjects",
    create: "/subjects",
    detail: (subjectId: string) => `/subjects/${subjectId}`,
  },

  notifications: {
    list: "/notifications",
    unreadCount: "/notifications/unread-count",
    readAll: "/notifications/read-all",
    read: (notificationId: string) => `/notifications/${notificationId}/read`,
    detail: (notificationId: string) => `/notifications/${notificationId}`,
  },

  sessions: {
    list: "/sessions",
    create: "/sessions",
    student: "/sessions/student",
    teacher: "/sessions/teacher",
    start: (sessionId: string) => `/sessions/${sessionId}/start`,
    end: (sessionId: string) => `/sessions/${sessionId}/end`,
    cancel: (sessionId: string) => `/sessions/${sessionId}/cancel`,
  },

  reviews: {
    list: "/reviews",
    create: "/reviews",
    teacher: (teacherId: string) => `/reviews/teacher/${teacherId}`,
    detail: (reviewId: string) => `/reviews/${reviewId}`,
  },

  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    userStatus: (userId: string) => `/admin/users/${userId}/status`,
  },
} as const;
