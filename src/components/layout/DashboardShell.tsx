/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Search,
  Settings,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/Sidebar";

const adminNavigation = [
  { label: "Dashboard", href: ROUTES.dashboard.admin, icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Teachers", href: "/admin/teachers", icon: User },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Subjects", href: "/admin/subjects", icon: BookOpen },
  { label: "Hire Requests", href: "/admin/hire-requests", icon: MessageSquare },
  { label: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { label: "Reports", href: "/admin/reports", icon: Star },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: ROUTES.profile, icon: User },
  { label: "Logout", href: "/logout", icon: LogOut },
];

const studentNavigation = [
  { label: "Dashboard", href: ROUTES.dashboard.student, icon: LayoutDashboard },
  { label: "Browse Teachers", href: ROUTES.teachers, icon: Users },
  { label: "My Requests", href: "/student/requests", icon: MessageSquare },
  { label: "My Packages", href: ROUTES.packages, icon: Package },
  { label: "Messages", href: "/student/messages", icon: MessageSquare, badge: "5" },
  { label: "Notifications", href: "/student/notifications", icon: Bell },
  { label: "Profile", href: ROUTES.profile, icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Logout", href: "/logout", icon: LogOut },
];

const teacherNavigation = [
  { label: "Dashboard", href: ROUTES.dashboard.teacher, icon: LayoutDashboard },
  { label: "My Students", href: "/teacher/students", icon: Users },
  { label: "My Packages", href: ROUTES.packages, icon: Package },
  { label: "Requests", href: "/teacher/requests", icon: MessageSquare },
  { label: "Earnings", href: "/teacher/earnings", icon: CreditCard },
  { label: "Schedule", href: "/teacher/schedule", icon: CalendarDays },
  { label: "Messages", href: "/teacher/messages", icon: MessageSquare, badge: "3" },
  { label: "Notifications", href: "/teacher/notifications", icon: Bell },
  { label: "Profile", href: ROUTES.profile, icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Logout", href: "/logout", icon: LogOut },
];

function getNavigation(pathname: string) {
  if (pathname.startsWith(ROUTES.dashboard.admin)) {
    return adminNavigation;
  }

  if (pathname.startsWith(ROUTES.dashboard.teacher)) {
    return teacherNavigation;
  }

  return studentNavigation;
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const navigation = getNavigation(pathname);

  const role = user?.role;
  const brandHref = role === "teacher"
    ? ROUTES.dashboard.teacher
    : role === "student"
    ? ROUTES.dashboard.student
    : ROUTES.home;

  async function handleLogout() {
    await signOut();
    router.replace(ROUTES.login);
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-72 shrink-0 border-r border-slate-200 bg-white">
        <Sidebar items={navigation} brandHref={brandHref} />
      </aside>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
