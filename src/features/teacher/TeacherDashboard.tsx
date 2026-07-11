import { ArrowRight, CheckCircle2, CreditCard, Gift, Heart, LayoutDashboard, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { TopNavbar } from "@/components/dashboard/TopNavbar";

const stats = [
  { title: "Total Students", value: "26", description: "Active learners this month", icon: Users, accent: "blue" as const },
  { title: "Active Packages", value: "9", description: "Current teaching bundles", icon: Gift, accent: "teal" as const },
  { title: "Pending Requests", value: "7", description: "New student requests", icon: MessageCircle, accent: "violet" as const },
  { title: "Monthly Earnings", value: "$3,420", description: "Projected this month", icon: CreditCard, accent: "indigo" as const },
];

const studentsTable = {
  columns: ["Student", "Course", "Status", "Next Session"],
  rows: [
    ["Emma Carter", "Biology", "Active", "Wed"],
    ["Jackson Lee", "SAT Prep", "Pending", "Thu"],
    ["Olivia Martin", "English", "Confirmed", "Fri"],
    ["Ethan Lewis", "Physics", "Active", "Mon"],
  ],
};

const requestsTable = {
  columns: ["Request", "Student", "Status", "Action"],
  rows: [
    ["Exam prep", "Emma Carter", "Pending", "Review"],
    ["Package update", "Jackson Lee", "Awaiting", "Approve"],
    ["Lesson feedback", "Olivia Martin", "Confirmed", "Send"],
    ["New inquiry", "Ethan Lewis", "New", "Message"],
  ],
};

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <TopNavbar title="Teacher Dashboard" subtitle="Manage students, packages, and sessions" />

      <Card className="overflow-hidden shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">Hello, Daniel</p>
            <h2 className="mt-4 text-3xl font-semibold">Welcome back</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-200">
              Stay on top of student requests, session planning, and earnings with a clear teaching workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>Review requests</Button>
              <Button variant="outline">Manage students</Button>
            </div>
          </div>
          <div className="grid gap-4 bg-slate-50 p-6">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Today’s schedule</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">4 lessons planned</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>9:00 AM — Biology review with Emma</p>
                <p>1:00 PM — SAT prep with Jackson</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Revenue</p>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                  <ArrowRight className="h-4 w-4" />
                  View report
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900">$3,420</p>
              <p className="mt-2 text-sm text-slate-600">Expected earnings for the month.</p>
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
          <DashboardTable title="Recent Students" description="Your latest student interactions and course details." columns={studentsTable.columns} rows={studentsTable.rows} />
          <DashboardTable title="Recent Requests" description="Request status and next action items." columns={requestsTable.columns} rows={requestsTable.rows} />
        </div>
        <div className="space-y-4">
          <OverviewCard title="Package overview" description="A quick look at your teaching bundles and outcomes." actionLabel="Review packages" />
          <NotificationsCard />
        </div>
      </div>
    </div>
  );
}
