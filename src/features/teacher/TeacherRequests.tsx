"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateBookingStatusMutation } from "@/hooks/useMutationHooks";
import { useBookingsQuery } from "@/hooks/useQueryHooks";
import { useAuthStore } from "@/store/useAuthStore";

export default function TeacherRequests() {
  const currentUser = useAuthStore((state) => state.user);
  const { data: bookings = [], isLoading } = useBookingsQuery();
  const updateBookingStatusMutation = useUpdateBookingStatusMutation();

  const incomingRequests = bookings.filter((booking) => booking.teacherId === currentUser?.id);

  const handleStatusUpdate = (bookingId: string, status: "accepted" | "rejected") => {
    updateBookingStatusMutation.mutate({
      bookingId,
      payload: { status },
    });
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Incoming Requests</CardTitle>
          <CardDescription>Accept or reject student hire requests and continue the conversation afterward.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-slate-600">Loading requests...</p>
          ) : incomingRequests.length ? (
            incomingRequests.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">Student: {booking.studentId}</p>
                    <p className="text-sm text-slate-600">Subject: {booking.subject}</p>
                    <p className="text-sm text-slate-600">Status: {booking.status}</p>
                  </div>
                  <Badge variant={booking.status === "accepted" ? "secondary" : "outline"}>
                    {booking.status}
                  </Badge>
                </div>
                {booking.status === "pending" ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => handleStatusUpdate(booking._id, "accepted")}>Accept</Button>
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(booking._id, "rejected")}>Reject</Button>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600">No incoming requests yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
