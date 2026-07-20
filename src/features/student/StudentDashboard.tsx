"use client";

import {
    BookOpen,
    CalendarClock,
    GraduationCap,
    Bell,
    Users,
    CircleAlert,
    Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCurrentStudentQuery, useStudentDashboardQuery } from "@/hooks/useQueryHooks";

const statCards = [
    { title: "Total Teachers", key: "totalTeachers", icon: Users, accent: "blue" },
    { title: "Active Packages", key: "activePackages", icon: BookOpen, accent: "teal" },
    { title: "Total Bookings", key: "totalBookings", icon: GraduationCap, accent: "violet" },
    { title: "Completed Sessions", key: "completedSessions", icon: CalendarClock, accent: "indigo" },
] as const;

function renderLoadingCard(label: string) {
    return (
        <Card key={label} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-8 w-20 rounded bg-slate-200" />
                    <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyState({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="mt-1">{description}</p>
        </div>
    );
}

export default function StudentDashboard() {
    const { data: dashboardResponse, isLoading, error } = useStudentDashboardQuery();
    const { data: currentStudentResponse } = useCurrentStudentQuery();

    const dashboardData = dashboardResponse?.data;
    const studentProfile = dashboardData?.profile;
    const studentUser = studentProfile?.user;
    const currentUser = currentStudentResponse?.data?.user;

    const fullName = [studentUser?.firstName, studentUser?.lastName].filter(Boolean).join(" ") || "Student";
    const initials = (studentUser?.firstName?.[0] ?? "S") + (studentUser?.lastName?.[0] ?? "");
    const notificationsCount = dashboardData?.stats?.unreadNotifications ?? 0;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 w-44 rounded bg-slate-200" />
                            <div className="h-10 w-72 rounded bg-slate-200" />
                            <div className="h-4 w-96 rounded bg-slate-100" />
                        </div>
                    </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{statCards.map(({ title }) => renderLoadingCard(title))}</div>
            </div>
        );
    }

    if (error || !dashboardData) {
        return (
            <Card className="rounded-3xl border border-rose-200 bg-rose-50 text-rose-700 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                        <CircleAlert className="h-5 w-5" />
                        <span>Unable to load your dashboard right now. Please try again later.</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-linear-to-r from-slate-900 via-slate-800 to-violet-900 text-white shadow-sm">
                <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-200">Welcome back</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Hello, {fullName} 👋</h1>
                            <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">
                                Here is your latest learning snapshot, recommended teachers, and upcoming session activity.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                            <Bell className="h-5 w-5 text-yellow-300" />
                            <div>
                                <p className="text-xs text-slate-200">Notifications</p>
                                <p className="text-lg font-semibold">{notificationsCount}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Student Information</CardTitle>
                        <CardDescription className="text-sm">Your current profile snapshot from the backend.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <Avatar className="h-18 w-18 border-4 border-white shadow-sm">
                                <AvatarImage src={currentUser?.avatar ?? studentUser?.avatar ?? undefined} alt={fullName} className="object-cover" />
                                <AvatarFallback className="bg-violet-100 text-violet-700 text-lg font-semibold">{initials || "ST"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{currentUser?.role ?? studentUser?.role ?? "student"}</Badge>
                                    <Badge variant="outline">{currentUser?.gender ?? studentUser?.gender ?? "Not provided"}</Badge>
                                </div>
                                <p className="text-sm text-slate-600">{currentUser?.email ?? studentUser?.email ?? "No email found"}</p>
                                <p className="text-sm text-slate-600">{currentUser?.phone ?? studentUser?.phone ?? "Phone not shared"}</p>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Preferred Subjects</p>
                                <p className="mt-1 text-sm text-slate-700">{studentProfile?.preferredSubjects?.join(", ") || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Learning Goals</p>
                                <p className="mt-1 text-sm text-slate-700">{studentProfile?.learningGoals?.join(", ") || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Interests</p>
                                <p className="mt-1 text-sm text-slate-700">{studentProfile?.interests?.join(", ") || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bio</p>
                                <p className="mt-1 text-sm text-slate-700">{studentProfile?.bio || "No bio available"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Overview</CardTitle>
                        <CardDescription className="text-sm">Your current activity summary.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {statCards.map(({ title, key, icon: Icon, accent }) => (
                            <div key={key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className={`rounded-xl p-2 ${accent === "blue" ? "bg-blue-100 text-blue-600" : accent === "teal" ? "bg-emerald-100 text-emerald-600" : accent === "violet" ? "bg-violet-100 text-violet-600" : "bg-indigo-100 text-indigo-600"}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{title}</span>
                                </div>
                                <span className="text-base font-semibold text-slate-900">{dashboardData.stats?.[key] ?? 0}</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                                    <Bell className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Notifications</span>
                            </div>
                            <span className="text-base font-semibold text-slate-900">{notificationsCount}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <CardTitle className="text-lg">Recommended Teachers</CardTitle>
                                <CardDescription className="text-sm">Suggested teachers based on your learning profile.</CardDescription>
                            </div>
                            <Sparkles className="h-5 w-5 text-violet-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {dashboardData.recommendedTeachers?.length ? (
                            dashboardData.recommendedTeachers.map((teacher) => (
                                <div key={teacher._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">{teacher.user?.firstName} {teacher.user?.lastName}</p>
                                            <p className="text-sm text-slate-600">{teacher.subjects?.join(", ") || "No subjects listed"}</p>
                                        </div>
                                        <Badge variant="secondary">${teacher.hourlyRate}/hr</Badge>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-600">{teacher.bio || "No bio available"}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {teacher.availability?.slice(0, 3).map((slot) => (
                                            <Badge key={slot} variant="outline">{slot}</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyState title="No recommended teachers yet" description="Your recommendations will appear here once the backend returns teacher matches." />
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Recent Bookings</CardTitle>
                        <CardDescription className="text-sm">Your latest booking activity.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {dashboardData.recentBookings?.length ? (
                            dashboardData.recentBookings.map((booking, index) => (
                                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="font-medium text-slate-900">{String((booking as Record<string, unknown>).teacherName ?? "Booking")}</p>
                                    <p className="text-sm text-slate-600">{String((booking as Record<string, unknown>).status ?? "Status unavailable")}</p>
                                </div>
                            ))
                        ) : (
                            <EmptyState title="No recent bookings" description="You have no booking history yet." />
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                    <CardDescription className="text-sm">Your next scheduled learning sessions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {dashboardData.upcomingSessions?.length ? (
                        dashboardData.upcomingSessions.map((session, index) => (
                            <div key={index} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <div>
                                    <p className="font-medium text-slate-900">{String((session as Record<string, unknown>).title ?? "Session")}</p>
                                    <p className="text-sm text-slate-600">{String((session as Record<string, unknown>).schedule ?? "Schedule unavailable")}</p>
                                </div>
                                <Button variant="outline" size="sm">View</Button>
                            </div>
                        ))
                    ) : (
                        <EmptyState title="No upcoming sessions" description="You do not have any sessions scheduled right now." />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}