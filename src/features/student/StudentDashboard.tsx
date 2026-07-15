/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { useAuthStore } from "@/store/useAuthStore";
import { usePackagesQuery, useTeachersQuery } from "@/hooks/useQueryHooks";

export default function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const displayName = user ? `${user.firstName} ${user.lastName}` : "Student";

  const { data: teachersData } = useTeachersQuery();
  const { data: packagesData } = usePackagesQuery();
  const teachers = Array.isArray(teachersData) ? teachersData : [];
  const packages = Array.isArray(packagesData) ? packagesData : [];

  const stats = useMemo(
    () => [
      {
        title: "Available Teachers",
        value: String(teachers.length),
        description: "Teachers currently available to book",
        icon: MessageCircle,
        accent: "blue" as const,
      },
      {
        title: "Active Packages",
        value: String(packages.length),
        description: "Packages available from our catalog",
        icon: MessageCircle,
        accent: "teal" as const,
      },
      {
        title: "Saved Teachers",
        value: "—",
        description: "Track your favorite mentors",
        icon: MessageCircle,
        accent: "violet" as const,
      },
      {
        title: "Completed Sessions",
        value: "—",
        description: "Lessons finished this month",
        icon: MessageCircle,
        accent: "indigo" as const,
      },
    ],
    [packages.length, teachers.length],
  );

  const teacherRows = teachers.slice(0, 4).map((teacher) => [
    teacher.name,
    teacher.subjects?.[0] ?? "—",
    "4.9",
    teacher.availability?.[0] ?? "—",
  ]);

  const packageRows = packages.slice(0, 4).map((pkg) => [
    pkg.name,
    `${pkg.sessions} sessions`,
    `$${pkg.price}`,
    pkg.isActive ? "Active" : "Inactive",
  ]);

  return (
    <div className="space-y-6">
      <TopNavbar title="Student Dashboard" subtitle="Your learning command center" />

      <Card className="overflow-hidden shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="bg-linear-to-br from-blue-600 via-blue-700 to-slate-900 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">Welcome back</p>
            <h2 className="mt-4 text-3xl font-semibold">{displayName}</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-200">
              Track your learning progress, available packages, and top teachers from the platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>Browse teachers</Button>
              <Button className="text-green-800" variant="outline">Manage packages</Button>
            </div>
          </div>
          <div className="grid gap-4 bg-slate-50 p-6">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Today’s focus</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">Keep learning</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Find the right teacher and book your next session.</p>
                <p>Review package details and match with a tutor.</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Progress</p>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                  <ArrowRight className="h-4 w-4" />
                  Keep going
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900">Stay consistent</p>
              <p className="mt-2 text-sm text-slate-600">Choose a teacher, book a package, and start your next lesson.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} description={item.description} icon={item.icon} accent={item.accent} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          <DashboardTable title="Available Teachers" description="Teachers currently listed in the platform." columns={["Teacher", "Primary Subject", "Rating", "Availability"]} rows={teacherRows} />
          <DashboardTable title="Package Highlights" description="Popular learning packages backed by the database." columns={["Package", "Sessions", "Price", "Status"]} rows={packageRows} />
        </div>
        <div className="space-y-4">
          
          <NotificationsCard />
        </div>
      </div>
    </div>
  );
}
