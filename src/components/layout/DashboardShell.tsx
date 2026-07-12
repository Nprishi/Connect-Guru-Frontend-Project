/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, CalendarDays, CreditCard, LayoutDashboard, LogOut, Menu, MessageSquare, Package, Search, Settings, User, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/dashboard/Sidebar";

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
  if (pathname.startsWith(ROUTES.dashboard.teacher)) {
    return teacherNavigation;
  }

  return studentNavigation;
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const navigation = getNavigation(pathname);

  async function handleLogout() {
    await signOut();
    router.replace(ROUTES.login);
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white md:flex">
        <Sidebar items={navigation} />
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-72 p-0">
                <Sidebar items={navigation} />
              </SheetContent>
            </Sheet>
            <Link href="/" className="text-lg font-semibold text-slate-900">
              Connect Guru
            </Link>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
