import type { Gender, UserRole } from "@/types/user";

export type RegisterRole = "student" | "teacher";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RegisterRole;
  phone: string;
  gender: Gender;
}

export interface AuthUser {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  role: UserRole;

  phone?: string;
  gender?: Gender;
  avatar?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message: string;
  data: T;
}

export interface ValidationErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
