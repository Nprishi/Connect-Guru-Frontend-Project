import Link from "next/link";
import { getTeachers } from "@/api/teacher.api";
import SearchPage from "@/features/search/SearchPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function TeachersPage() {
  const response = await getTeachers().catch(() => ({ data: [] }));
  const teachers = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="space-y-4">
      <SearchPage />
      <div className="grid gap-4 md:grid-cols-2">
        {teachers?.map((teacher) => (
          <Card key={teacher.id} className="shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{teacher.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{teacher.name}</CardTitle>
                    <CardDescription>{teacher.bio}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">${teacher.hourlyRate}/hr</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {teacher.subjects?.slice(0, 3).map((subject) => (
                  <Badge key={subject} variant="outline">{subject}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{teacher.availability?.join(", ") || "Available now"}</span>
                <Link href={`/teachers/${teacher.id}`}>
                  <Button size="sm">View profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
