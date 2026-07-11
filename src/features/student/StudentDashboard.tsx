import { ArrowRight, CheckCircle2, Gift, Heart, LayoutDashboard, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { TopNavbar } from "@/components/dashboard/TopNavbar";

const stats = [
  { title: "Total Requests", value: "18", description: "Requests created this month", icon: MessageCircle, accent: "blue" as const },
  { title: "Active Packages", value: "4", description: "Learning bundles in progress", icon: Gift, accent: "teal" as const },
  { title: "Favorite Teachers", value: "6", description: "Saved educator profiles", icon: Heart, accent: "violet" as const },
  { title: "Completed Sessions", value: "42", description: "Lessons finished this quarter", icon: CheckCircle2, accent: "indigo" as const },
];

const teachersTable = {
  columns: ["Teacher", "Subject", "Rating", "Availability"],
  rows: [
    ["Maya Singh", "Physics", "4.9", "Mon, Wed"],
    ["Noah Williams", "Mathematics", "4.8", "Tue, Thu"],
    ["Sophia Brown", "English", "4.7", "Fri"],
    ["Liam Johnson", "Chemistry", "4.8", "Mon, Sat"],
  ],
};

const requestTable = {
  columns: ["Request", "Teacher", "Status", "Next Step"],
  rows: [
    ["Calculus support", "Noah Williams", "Pending", "Review"],
    ["Essay review", "Sophia Brown", "Confirmed", "Join"],
    ["Science revision", "Maya Singh", "Awaiting", "Message"],
    ["SAT planning", "Liam Johnson", "Completed", "Feedback"],
  ],
};

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <TopNavbar title="Student Dashboard" subtitle="Your learning command center" />

      <Card className="overflow-hidden shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">Welcome back</p>
            <h2 className="mt-4 text-3xl font-semibold">Jane Doe</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-200">
              Track your reading, requests, packages, and next sessions in one modern dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>Browse teachers</Button>
              <Button variant="outline">Manage packages</Button>
            </div>
          </div>
          <div className="grid gap-4 bg-slate-50 p-6">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Today’s focus</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">2 sessions scheduled</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>10:00 AM — Geometry tutorial with Noah</p>
                <p>3:00 PM — Chemistry revision with Maya</p>
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
              <p className="mt-3 text-2xl font-semibold text-slate-900">84% complete</p>
              <p className="mt-2 text-sm text-slate-600">You’re on track to hit your learning goals this month.</p>
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
          <DashboardTable title="Recent Teachers" description="Teachers you’ve engaged with recently." columns={teachersTable.columns} rows={teachersTable.rows} />
          <DashboardTable title="Recent Requests" description="Your latest learning requests and current status." columns={requestTable.columns} rows={requestTable.rows} />
        </div>
        <div className="space-y-4">
          <OverviewCard title="Upcoming sessions" description="A quick glance at your next lessons and priorities." actionLabel="View schedule" />
          <NotificationsCard />
        </div>
      </div>
    </div>
  );
}
