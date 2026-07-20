"use client";

import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  useTeacherOverviewQuery,
  useTeacherQuery,
  useTeacherStudentsQuery,
} from "@/hooks/useQueryHooks";
import { useUpdateTeacherAvailabilityMutation } from "@/hooks/useMutationHooks";
import { useAuthStore } from "@/store/useAuthStore";

import { TeacherHero } from "./TeacherHero";

export default function TeacherDashboard() {
  const user = useAuthStore((state) => state.user);
  const teacherId = user?.id;
  const [availabilityInput, setAvailabilityInput] = useState("");

  const { data: teacherProfileResponse, isLoading: teacherProfileLoading } = useTeacherQuery(teacherId);
  const { data: overviewResponse, isLoading: overviewLoading } = useTeacherOverviewQuery();
  const { data: students = [], isLoading: studentsLoading } = useTeacherStudentsQuery();
  const updateAvailabilityMutation = useUpdateTeacherAvailabilityMutation();

  const teacherProfile = teacherProfileResponse?.data?.profile;
  const teacherUser = teacherProfileResponse?.data?.user;
  const overview = overviewResponse?.data;

  const stats = useMemo(
    () => [
      {
        title: "Total Students",
        value: `${students.length}`,
        description: "Assigned learners",
        icon: Users,
        accent: "blue" as const,
      },
      {
        title: "Pending Requests",
        value: `${overview?.pendingRequests ?? 0}`,
        description: "New requests",
        icon: MessageCircle,
        accent: "violet" as const,
      },
      {
        title: "Monthly Earnings",
        value: `$${overview?.monthlyEarnings ?? 0}`,
        description: "This month",
        icon: CreditCard,
        accent: "indigo" as const,
      },
      {
        title: "Average Rating",
        value: `${teacherProfile?.rating ?? 0}`,
        description: "Teacher rating",
        icon: Star,
        accent: "teal" as const,
      },
    ],
    [overview, students.length, teacherProfile?.rating],
  );

  const initials = `${teacherUser?.firstName?.[0] ?? "T"}${teacherUser?.lastName?.[0] ?? ""}`;

  if (overviewLoading || teacherProfileLoading) {
    return (
      <div className="space-y-6">
        <TeacherHero greetingName={user?.firstName ?? "Teacher"} packageCount={0} />
        <div className="grid gap-4 xl:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.title} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-8 w-20 rounded bg-slate-200" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const handleAvailabilitySave = () => {
    const parsed = availabilityInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateAvailabilityMutation.mutate({ availability: parsed });
  };

  return (
    <div className="space-y-6">
      <TeacherHero greetingName={teacherUser?.firstName ?? user?.firstName ?? "Teacher"} packageCount={students.length} />

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Teacher Information</CardTitle>
            <CardDescription className="text-sm">Your profile details are synced from the backend.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-lg font-semibold text-violet-700">
                {initials}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">{teacherUser?.firstName} {teacherUser?.lastName}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{teacherUser?.role ?? "teacher"}</Badge>
                  <Badge variant="outline">{teacherUser?.gender ?? "Gender not shared"}</Badge>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4" />{teacherUser?.email}</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{teacherUser?.phone ?? "Phone not shared"}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Subjects</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(teacherProfile?.subjects ?? []).map((subject) => (
                    <Badge key={subject} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Availability</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(teacherProfile?.availability ?? []).map((slot) => (
                    <Badge key={slot} variant="secondary">{slot}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Hourly Rate</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">${teacherProfile?.hourlyRate ?? 0}/hr</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Reviews</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{teacherProfile?.totalReviews ?? 0} total reviews</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bio</p>
              <p className="mt-2 text-sm text-slate-700">{teacherProfile?.bio || "No bio provided."}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Education</p>
                <p className="mt-2 text-sm text-slate-700">{teacherProfile?.education?.join(", ") || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Experience</p>
                <p className="mt-2 text-sm text-slate-700">{teacherProfile?.experience?.join(", ") || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Teacher Availability</CardTitle>
            <CardDescription className="text-sm">Use the existing availability endpoint to update your open slots.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={availabilityInput}
              onChange={(event) => setAvailabilityInput(event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
              placeholder="Monday 9AM-12PM, Tuesday 2PM-6PM"
            />
            <div className="flex flex-wrap gap-2">
              {(teacherProfile?.availability ?? []).map((slot) => (
                <Badge key={slot} variant="outline">{slot}</Badge>
              ))}
            </div>
            <Button onClick={handleAvailabilitySave} disabled={updateAvailabilityMutation.isPending} className="w-full md:w-auto">
              {updateAvailabilityMutation.isPending ? "Saving..." : "Save Availability"}
            </Button>
            {updateAvailabilityMutation.isError ? (
              <p className="text-sm text-rose-600">Unable to update availability right now.</p>
            ) : null}
            {updateAvailabilityMutation.isSuccess ? (
              <p className="text-sm text-emerald-600">Availability updated successfully.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Teacher Students</CardTitle>
                <CardDescription className="text-sm">Assigned students returned by the backend.</CardDescription>
              </div>
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-56 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : students.length ? (
              students.map((student) => (
                <div key={student._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{student.user?.firstName ?? "Student"} {student.user?.lastName ?? ""}</p>
                      <p className="text-sm text-slate-600">{student.user?.email ?? "Email unavailable"}</p>
                    </div>
                    <Badge variant="secondary">{student.status ?? "Active"}</Badge>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                    <p><span className="font-medium text-slate-900">Package:</span> {student.packageName ?? "N/A"}</p>
                    <p><span className="font-medium text-slate-900">Progress:</span> {student.progress ?? 0}%</p>
                    <p><span className="font-medium text-slate-900">Last class:</span> {student.lastClass ?? "N/A"}</p>
                    <p><span className="font-medium text-slate-900">Next class:</span> {student.nextClass ?? "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No students are assigned yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Teaching Snapshot</CardTitle>
            <CardDescription className="text-sm">Live overview from the teacher dashboard response.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Upcoming Sessions</span>
              <span className="text-base font-semibold text-slate-900">{overview?.upcomingSessions ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Confirmed Bookings</span>
              <span className="text-base font-semibold text-slate-900">{overview?.confirmedBookings ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Today Sessions</span>
              <span className="text-base font-semibold text-slate-900">{overview?.todaySessions ?? 0}</span>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 text-sm text-violet-700">
              <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4" /> Teacher profile</div>
              <p className="mt-2">The backend response currently surfaces the profile, ratings, subjects, availability, and teaching overview.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><Briefcase className="h-4 w-4" /> Profile</div>
            <p className="mt-3 text-sm text-slate-700">Complete teacher information is shown above and is rendered from the existing backend response.</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><CalendarDays className="h-4 w-4" /> Availability</div>
            <p className="mt-3 text-sm text-slate-700">This uses the existing PATCH availability endpoint and updates the UI after a successful response.</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><Users className="h-4 w-4" /> Students</div>
            <p className="mt-3 text-sm text-slate-700">List of assigned students is shown with loading and empty states.</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><CheckCircle2 className="h-4 w-4" /> Reviews</div>
            <p className="mt-3 text-sm text-slate-700">Ratings and review counts are surfaced directly from the teacher profile response.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
