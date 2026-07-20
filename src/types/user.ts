export type UserRole = "student" | "teacher" | "admin" | "super_admin";

export type UserStatus = "active" | "inactive" | "suspended" | "banned";

export type Gender = "male" | "female" | "other";

export interface UserProfile {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  role: UserRole;

  phone?: string;
  gender?: Gender;

  avatar?: string | null;
  status?: UserStatus;

  createdAt?: string;
  updatedAt?: string;
}
