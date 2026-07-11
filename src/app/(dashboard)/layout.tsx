"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/constants/routes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const ready = useAuthStore((state) => state.ready);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!user) {
      router.replace(ROUTES.login);
      return;
    }

    const isStudentRoute = pathname.startsWith(ROUTES.dashboard.student);
    const isTeacherRoute = pathname.startsWith(ROUTES.dashboard.teacher);

    if (user.role === "student" && !isStudentRoute) {
      router.replace(ROUTES.dashboard.student);
      return;
    }

    if (user.role === "teacher" && !isTeacherRoute) {
      router.replace(ROUTES.dashboard.teacher);
      return;
    }

    if (user.role !== "student" && user.role !== "teacher") {
      router.replace(ROUTES.dashboard.student);
      return;
    }
  }, [ready, router, user, pathname]);

  if (!ready || !user) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
