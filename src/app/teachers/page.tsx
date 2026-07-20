"use client";

import Link from "next/link";
import { useTeachersQuery } from "@/hooks/useQueryHooks";
import SearchPage from "@/features/search/SearchPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TeachersPage() {
  const { data, isLoading, error } = useTeachersQuery();
  const teachers = data?.data?.teachers ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SearchPage />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-5">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="h-8 w-40 rounded bg-slate-200" />
                  <div className="h-4 w-44 rounded bg-slate-100" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchPage />

      {error ? (
        <Card className="border-rose-200 bg-rose-50 text-rose-700 shadow-sm">
          <CardContent className="p-4">
            <p className="font-medium">Unable to load teachers right now.</p>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {teachers.length ? (
          teachers.map((teacher) => {
            const teacherName = `${teacher.user?.firstName ?? ""} ${teacher.user?.lastName ?? ""}`.trim() || "Teacher";
            const initials = `${teacher.user?.firstName?.[0] ?? "T"}${teacher.user?.lastName?.[0] ?? ""}`.toUpperCase();

            return (
              <Card key={teacher.user?._id ?? teacher.profile?._id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{teacherName}</CardTitle>
                        <CardDescription>{teacher.profile?.bio || "Teacher profile"}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">${teacher.profile?.hourlyRate ?? 0}/hr</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(teacher.profile?.subjects ?? []).slice(0, 3).map((subject) => (
                      <Badge key={subject} variant="outline">{subject}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{teacher.profile?.availability?.join(", ") || "Available now"}</span>
                    <Link href={`/teachers/${teacher.user?._id ?? teacher.profile?.userId}`}>
                      <Button size="sm">View profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="md:col-span-2 shadow-sm">
            <CardContent className="p-6 text-sm text-slate-600">
              No teachers are available right now.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
