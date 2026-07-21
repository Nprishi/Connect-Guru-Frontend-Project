"use client";

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/api/auth.api";
import { getAdminDashboard } from "@/api/admin.api";
import { getBookings } from "@/api/bookings.api";
import { getConversations, getMessages } from "@/api/chat.api";
import { getNotifications } from "@/api/notification.api";
import {
  getCurrentTeacherPackages,
  getPackage,
  getPackages,
  getTeacherPackages,
} from "@/api/package.api";
import {
  getCurrentStudent,
  getStudentDashboard,
  getStudentProfile,
} from "@/api/student.api";
import {
  getTeachers,
  getCurrentTeacherProfile,
  getTeacherOverview,
  getTeacherProfile,
  getTeacherStudents,
} from "@/api/teacher.api";

export function useProfileQuery() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCurrentStudentQuery(enabled = true) {
  return useQuery({
    queryKey: ["student", "current"],
    queryFn: getCurrentStudent,
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useStudentDashboardQuery() {
  return useQuery({
    queryKey: ["student", "dashboard"],
    queryFn: getStudentDashboard,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useStudentProfileQuery(userId?: string) {
  return useQuery({
    queryKey: ["student", userId],
    queryFn: () => getStudentProfile(userId!),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useTeacherQuery(userId?: string) {
  return useQuery({
    queryKey: ["teacher", userId],
    queryFn: () => getTeacherProfile(userId!),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCurrentTeacherQuery(enabled = true) {
  return useQuery({
    queryKey: ["teacher", "current"],
    queryFn: getCurrentTeacherProfile,
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useTeachersQuery(subject?: string) {
  return useQuery({
    queryKey: ["teachers", subject],
    queryFn: () => getTeachers(subject),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useTeacherOverviewQuery() {
  return useQuery({
    queryKey: ["teacher", "dashboard"],
    queryFn: getTeacherOverview,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTeacherStudentsQuery() {
  return useQuery({
    queryKey: ["teacher", "students"],
    queryFn: getTeacherStudents,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 0,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
}

export function useBookingsQuery() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useConversationsQuery() {
  return useQuery({
    queryKey: ["chat", "conversations"],
    queryFn: getConversations,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useMessagesQuery(conversationId?: string) {
  return useQuery({
    queryKey: ["chat", "messages", conversationId],
    queryFn: () => getMessages(conversationId!),
    enabled: Boolean(conversationId),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePackagesQuery() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useCurrentTeacherPackagesQuery(enabled = true) {
  return useQuery({
    queryKey: ["teacher-packages"],
    queryFn: getCurrentTeacherPackages,
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useTeacherPackagesQuery(teacherId?: string) {
  return useQuery({
    queryKey: ["teacher-packages", teacherId],
    queryFn: () => getTeacherPackages(teacherId!),
    enabled: Boolean(teacherId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function usePackageQuery(packageId?: string) {
  return useQuery({
    queryKey: ["package", packageId],
    queryFn: () => getPackage(packageId!),
    enabled: Boolean(packageId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useNotificationsQuery() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
