"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser, logoutUser, registerUser } from "@/api/auth.api";
import { createBooking, updateBookingStatus } from "@/api/bookings.api";
import { sendMessage } from "@/api/chat.api";

import { createStudentProfile, updateStudentProfile } from "@/api/student.api";
import { updateTeacherAvailability } from "@/api/teacher.api";
import { updateUserAvatar } from "@/api/user.api";

import { useAuthStore } from "@/store/useAuthStore";

import { useRouter } from "next/navigation";

import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

import type {
  CreateStudentProfilePayload,
  StudentProfileResponse,
  UpdateStudentProfilePayload,
} from "@/types/student";
import type { Booking, CreateBookingPayload, UpdateBookingStatusPayload } from "@/types/bookings";
import type { ChatMessage, SendMessagePayload } from "@/types/chat";
import type { TeacherAvailabilityPayload } from "@/types/teacher";
import type { ApiResponse } from "@/types/api";

export function useAuthActions() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const router = useRouter();

  const redirectByRole = (role: string) => {
    switch (role) {
      case "student":
        router.replace("/student");
        break;

      case "teacher":
        router.replace("/teacher");
        break;

      case "admin":
        router.replace("/admin");
        break;

      case "super_admin":
        router.replace("/super-admin");
        break;

      default:
        router.replace("/login");
    }
  };

  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data);
      redirectByRole(data.user.role);
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data);
      redirectByRole(data.user.role);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      router.replace("/login");
    },
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}

export function useCreateStudentProfileMutation() {
  return useMutation<
    StudentProfileResponse,
    Error,
    CreateStudentProfilePayload
  >({
    mutationFn: createStudentProfile,
  });
}

export function useUpdateStudentProfileMutation() {
  return useMutation<
    StudentProfileResponse,
    Error,
    UpdateStudentProfilePayload
  >({
    mutationFn: updateStudentProfile,
  });
}

export function useUpdateUserAvatarMutation() {
  return useMutation<
    unknown,
    Error,
    FormData
  >({
    mutationFn: updateUserAvatar,
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, CreateBookingPayload>({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useUpdateBookingStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, { bookingId: string; payload: UpdateBookingStatusPayload }>({
    mutationFn: ({ bookingId, payload }) => updateBookingStatus(bookingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useSendMessageMutation() {
  return useMutation<ChatMessage, Error, SendMessagePayload>({
    mutationFn: sendMessage,
  });
}

export function useUpdateTeacherAvailabilityMutation() {
  return useMutation<
    ApiResponse<TeacherAvailabilityPayload>,
    Error,
    TeacherAvailabilityPayload
  >({
    mutationFn: updateTeacherAvailability,
  });
}
