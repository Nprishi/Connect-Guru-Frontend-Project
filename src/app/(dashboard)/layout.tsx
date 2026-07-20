"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserRole } from "@/types/user";

type DashboardLayoutProps = {
  children: ReactNode;
};

const roleRoutes: Record<UserRole, string> = {
  student: ROUTES.dashboard.student,
  teacher: ROUTES.dashboard.teacher,
  admin: ROUTES.dashboard.admin,
  super_admin: ROUTES.dashboard.superAdmin,
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const ready = useAuthStore((state) => state.ready);

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      router.replace(ROUTES.login);
      return;
    }

    const targetRoute = roleRoutes[user.role];

    if (!targetRoute) {
      router.replace(ROUTES.login);
      return;
    }

    if (!pathname.startsWith(targetRoute)) {
      router.replace(targetRoute);
    }
  }, [pathname, ready, router, user]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}