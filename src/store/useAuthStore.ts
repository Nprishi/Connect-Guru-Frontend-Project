"use client";

import { create } from "zustand";
import type { AuthResponse, AuthUser } from "@/types/auth";

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  user: AuthUser | null;
  ready: boolean;
  setAuth: (auth: AuthResponse) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  clearAuth: () => void;
  setReady: (ready: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  user: null,
  ready: false,
  setAuth: (auth) =>
    set({
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      user: auth.user,
    }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  clearAuth: () =>
    set({
      accessToken: undefined,
      refreshToken: undefined,
      user: null,
    }),
  setReady: (ready) => set({ ready }),
}));
