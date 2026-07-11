export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/cg";

export const API_ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh-token",
    logout: "/auth/logout",
    profile: "/auth/profile",
  },
  teachers: {
    list: "/teachers",
    profile: (userId: string) => `/teachers/profile/${userId}`,
  },
  students: {
    profile: "/students/profile",
  },
  packages: {
    list: "/packages",
    teacher: (teacherId: string) => `/packages/teacher/${teacherId}`,
    detail: (packageId: string) => `/packages/${packageId}`,
  },
  profile: {
    me: "/users/profile",
  },
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
  },
};
