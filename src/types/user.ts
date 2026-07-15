import type { AuthUser } from "@/types/auth";

export interface UserProfile extends AuthUser {
  avatar?: string;
  status?: string;
}
