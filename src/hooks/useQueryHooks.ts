"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
} from "@/api/auth.api";
import { getPackages } from "@/api/package.api";
import { getTeachers, getTeacherProfile } from "@/api/teacher.api";
import { getAdminDashboard } from "@/api/admin.api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export function useAuthActions() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data);
      const role = data?.user?.role;
      if (role === "teacher") {
        router.replace("/teacher");
        console.log(localStorage.getItem("auth"));
      } else {
        router.replace("/student");
        console.log(localStorage.getItem("auth"));
      }
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data);
      const role = data?.user?.role;
      if (role === "teacher") {
        router.replace("/teacher");
      } else {
        router.replace("/student");
      }
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      router.replace("/login");
      console.log(localStorage.getItem("auth"));
    },
  });

  return { loginMutation, registerMutation, logoutMutation };
}

export function useProfileQuery() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTeachersQuery(subject?: string) {
  return useQuery({
    queryKey: ["teachers", subject ?? "all"],
    queryFn: () => getTeachers(subject).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTeacherQuery(userId?: string) {
  return useQuery({
    queryKey: ["teacher", userId],
    queryFn: () => getTeacherProfile(userId!).then((res) => res.data),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePackagesQuery() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: () => getPackages().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => getAdminDashboard().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
}
