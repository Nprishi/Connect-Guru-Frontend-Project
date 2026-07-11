import { notFound } from "next/navigation";
import { getTeacherProfile } from "@/api/teacher.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function TeacherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getTeacherProfile(id).catch(() => null);
  const teacher = response?.data;

  if (!teacher) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback>{teacher.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{teacher.name}</CardTitle>
                <CardDescription>{teacher.bio}</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>${teacher.hourlyRate}/hr</Badge>
              <Badge variant="outline">Top rated</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {teacher.subjects?.map((subject) => (
              <Badge key={subject} variant="secondary">{subject}</Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button>Book session</Button>
            <Button variant="outline">Message</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs>
        <TabsList>
          <TabsTrigger>Overview</TabsTrigger>
          <TabsTrigger>Availability</TabsTrigger>
          <TabsTrigger>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">{teacher.experience?.join(", ")}</p>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p><strong>Availability:</strong> {teacher.availability?.join(", ")}</p>
            <p><strong>Experience:</strong> {teacher.experience?.join(", ")}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
