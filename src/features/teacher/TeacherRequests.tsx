"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateBookingStatusMutation } from "@/hooks/useMutationHooks";
import { useBookingsQuery, useCurrentTeacherQuery, useStudentProfileQuery } from "@/hooks/useQueryHooks";
import { useAuthStore } from "@/store/useAuthStore";
import type { Booking } from "@/types/bookings";

export default function TeacherRequests() {
  const currentUser = useAuthStore((state) => state.user);
  const { data: teacherProfileResponse } = useCurrentTeacherQuery();
  const { data: bookings = [], isLoading } = useBookingsQuery();
  const updateBookingStatusMutation = useUpdateBookingStatusMutation();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);
  const { data: selectedStudentProfile, isLoading: selectedStudentProfileLoading } = useStudentProfileQuery(selectedBooking?.studentId);

  const teacherIdentityCandidates = useMemo(() => {
    const profile = teacherProfileResponse?.data?.profile;
    const user = teacherProfileResponse?.data?.user;

    return [
      currentUser?.id,
      profile?._id,
      profile?.userId,
      user?._id,
    ].filter((value): value is string => Boolean(value));
  }, [currentUser?.id, teacherProfileResponse]);

  const isTeacherBooking = (booking: Booking) => teacherIdentityCandidates.some((value) => booking.teacherId === value);

  const pendingRequests = useMemo(
    () => bookings.filter((booking) => isTeacherBooking(booking) && ["pending", "requested"].includes((booking.status ?? "pending").toLowerCase())),
    [bookings, isTeacherBooking, teacherIdentityCandidates],
  );

  const acceptedBookings = useMemo(
    () => bookings.filter((booking) => isTeacherBooking(booking) && booking.status?.toLowerCase() === "accepted"),
    [bookings, isTeacherBooking, teacherIdentityCandidates],
  );

  const handleStatusUpdate = (bookingId: string, status: "accepted" | "rejected") => {
    setPendingActionId(bookingId);

    updateBookingStatusMutation.mutate(
      {
        bookingId,
        payload: { status },
      },
      {
        onSuccess: () => {
          setPendingActionId(null);
          toast.success(status === "accepted" ? "Booking accepted and saved." : "Booking rejected.");
        },
        onError: (error: Error) => {
          setPendingActionId(null);
          toast.error(error.message || "Unable to update booking request.");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Pending Requests</CardTitle>
          <CardDescription>Accept or reject student hire requests and continue the conversation afterward.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-2 h-3 w-40" />
                </div>
              ))}
            </div>
          ) : pendingRequests.length ? (
            pendingRequests.map((booking) => {
              const studentName = `${booking.student?.user?.firstName ?? "Student"} ${booking.student?.user?.lastName ?? ""}`.trim();
              return (
                <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">Student: {studentName}</p>
                      <p className="text-sm text-slate-600">Subject: {booking.subject || "Not provided"}</p>
                      <p className="text-sm text-slate-600">Hourly Rate: ${booking.hourlyRate ?? 0}</p>
                      <p className="text-sm text-slate-600">Notes: {booking.notes || "No notes provided."}</p>
                      <p className="text-sm text-slate-600">Created: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}</p>
                    </div>
                    <Badge variant="outline">{booking.status || "Pending"}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                      View Student
                    </Button>
                    <Button size="sm" onClick={() => handleStatusUpdate(booking._id, "accepted")} disabled={pendingActionId === booking._id}>
                      {pendingActionId === booking._id ? "Saving..." : "Accept"}
                    </Button>
                    <Button size="sm" variant="outline" className="text-rose-600 hover:text-rose-700" onClick={() => handleStatusUpdate(booking._id, "rejected")} disabled={pendingActionId === booking._id}>
                      {pendingActionId === booking._id ? "Saving..." : "Reject"}
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-600">No pending requests.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Accepted Bookings</CardTitle>
          <CardDescription>Students that have already accepted the booking request.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {acceptedBookings.length ? (
            acceptedBookings.map((booking) => {
              const studentName = `${booking.student?.user?.firstName ?? "Student"} ${booking.student?.user?.lastName ?? ""}`.trim();
              return (
                <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">Student: {studentName}</p>
                      <p className="text-sm text-slate-600">Subject: {booking.subject || "Not provided"}</p>
                      <p className="text-sm text-slate-600">Hourly Rate: ${booking.hourlyRate ?? 0}</p>
                      <p className="text-sm text-slate-600">Status: {booking.status || "Accepted"}</p>
                    </div>
                    <Badge variant="secondary">Accepted</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                      View Student
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-600">No accepted bookings yet.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => {
        if (!open) {
          setSelectedBooking(null);
        }
      }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Read-only profile details for the selected student.</DialogDescription>
          </DialogHeader>
          {selectedStudentProfileLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedStudentProfile?.data?.user?.avatar ?? undefined} alt="Student avatar" />
                  <AvatarFallback>{`${selectedStudentProfile?.data?.user?.firstName?.[0] ?? "S"}${selectedStudentProfile?.data?.user?.lastName?.[0] ?? ""}`}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-slate-900">{`${selectedStudentProfile?.data?.user?.firstName ?? "Student"} ${selectedStudentProfile?.data?.user?.lastName ?? ""}`.trim()}</p>
                  <p className="text-sm text-slate-600">{selectedStudentProfile?.data?.user?.email ?? "Email unavailable"}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Phone</p>
                  <p className="mt-2 text-sm text-slate-700">{selectedStudentProfile?.data?.user?.phone || "Phone not shared"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Preferred Subjects</p>
                  <p className="mt-2 text-sm text-slate-700">{selectedStudentProfile?.data?.profile?.preferredSubjects?.join(", ") || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Learning Goals</p>
                  <p className="mt-2 text-sm text-slate-700">{selectedStudentProfile?.data?.profile?.learningGoals?.join(", ") || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Interests</p>
                  <p className="mt-2 text-sm text-slate-700">{selectedStudentProfile?.data?.profile?.interests?.join(", ") || "Not provided"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bio</p>
                <p className="mt-2 text-sm text-slate-700">{selectedStudentProfile?.data?.profile?.bio || "No bio provided."}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedBooking(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
