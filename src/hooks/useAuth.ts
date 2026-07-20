/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { loginUser, logoutUser, registerUser } from "@/api/auth.api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const ready = useAuthStore((state) => state.ready);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  async function login(payload: LoginPayload) {
    const auth = await loginUser(payload);
    setAuth(auth);
    return auth;
  }

  async function register(payload: RegisterPayload) {
    const auth = await registerUser(payload);
    setAuth(auth);
    return auth;
  }

  async function signOut() {
    try {
      await logoutUser();
    } catch {
      // ignore
    }
    clearAuth();
  }

  return { user, ready, login, register, signOut };
}
