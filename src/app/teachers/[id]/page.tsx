import Link from "next/link";
import { notFound } from "next/navigation";

import { getTeacherProfile } from "@/api/teacher.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HireTeacherButton from "@/features/teacher/HireTeacherButton";

export default async function TeacherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getTeacherProfile(id).catch(() => null);
  const teacher = response?.data;

  if (!teacher) {
    notFound();
  }

  const teacherUser = teacher.user;
  const teacherProfile = teacher.profile;
  const initials = `${teacherUser?.firstName?.[0] ?? "T"}${teacherUser?.lastName?.[0] ?? ""}`;

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
              teacherId={teacherUser?._id ?? id}
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
