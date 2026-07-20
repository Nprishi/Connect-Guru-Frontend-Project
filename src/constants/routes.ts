export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",

  dashboard: {
    root: "/",
    student: "/student",
    teacher: "/teacher",
    admin: "/admin",
    superAdmin: "/super-admin",
  },

  teachers: "/teachers",
  packages: "/packages",
  profile: "/profile",
} as const;
