"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookingsQuery } from "@/hooks/useQueryHooks";
import { useAuthStore } from "@/store/useAuthStore";

export default function StudentRequests() {
  const currentUser = useAuthStore((state) => state.user);
  const { data: bookings = [], isLoading } = useBookingsQuery();

  const myRequests = bookings.filter((booking) => booking.studentId === currentUser?.id);

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">My Requests</CardTitle>
          <CardDescription>Track hire requests sent to teachers and their latest response.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-slate-600">Loading requests...</p>
          ) : myRequests.length ? (
            myRequests.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">Teacher: {booking.teacherId}</p>
                    <p className="text-sm text-slate-600">Subject: {booking.subject}</p>
                  </div>
                  <Badge variant={booking.status === "accepted" ? "secondary" : "outline"}>
                    {booking.status}
                  </Badge>
                </div>
                {booking.status === "accepted" ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href="/messages">
                      <Button size="sm">Message Teacher</Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600">No hire requests yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
