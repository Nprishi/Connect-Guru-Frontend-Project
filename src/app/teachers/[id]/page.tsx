"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HireTeacherButton from "@/features/teacher/HireTeacherButton";
import { useTeacherQuery } from "@/hooks/useQueryHooks";

export default function TeacherDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { data, isLoading, error } = useTeacherQuery(id);

  const teacher = data?.data;
  const teacherUser = teacher?.user;
  const teacherProfile = teacher?.profile;
  const initials = `${teacherUser?.firstName?.[0] ?? "T"}${teacherUser?.lastName?.[0] ?? ""}`;

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="h-10 w-56 rounded bg-slate-200" />
            <div className="h-4 w-72 rounded bg-slate-100" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !teacher) {
    return (
      <Card className="border-rose-200 bg-rose-50 text-rose-700 shadow-sm">
        <CardContent className="p-6">
          <p className="font-medium">Unable to load this teacher profile right now.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={teacherUser?.avatar ?? undefined} alt={`${teacherUser?.firstName ?? "Teacher"} ${teacherUser?.lastName ?? ""}`} className="object-cover" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{teacherUser?.firstName} {teacherUser?.lastName}</CardTitle>
                <CardDescription>{teacherProfile?.bio || "Teacher profile details are available from the backend response."}</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>${teacherProfile?.hourlyRate ?? 0}/hr</Badge>
              <Badge variant="outline">{teacherProfile?.rating ?? 0} rating</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(teacherProfile?.subjects ?? []).map((subject) => (
              <Badge key={subject} variant="secondary">{subject}</Badge>
            ))}
          </div>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            <p><strong>Email:</strong> {teacherUser?.email}</p>
            <p><strong>Phone:</strong> {teacherUser?.phone ?? "Not shared"}</p>
            <p><strong>Availability:</strong> {(teacherProfile?.availability ?? []).join(", ") || "Not provided"}</p>
            <p><strong>Experience:</strong> {(teacherProfile?.experience ?? []).join(", ") || "Not provided"}</p>
            <p><strong>Education:</strong> {(teacherProfile?.education ?? []).join(", ") || "Not provided"}</p>
            <p><strong>Reviews:</strong> {teacherProfile?.totalReviews ?? 0}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <HireTeacherButton
              teacherId={teacherProfile?.userId ?? teacherUser?._id ?? id}
              teacherName={`${teacherUser?.firstName ?? "Teacher"} ${teacherUser?.lastName ?? ""}`.trim()}
              subject={(teacherProfile?.subjects ?? [])[0]}
              hourlyRate={teacherProfile?.hourlyRate ?? 0}
            />
            <Link href="/messages">
              <Button variant="outline">Message</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
