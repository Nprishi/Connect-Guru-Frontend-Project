"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatePaymentMutation } from "@/hooks/useMutationHooks";
import { useBookingsQuery } from "@/hooks/useQueryHooks";
import { useAuthStore } from "@/store/useAuthStore";
import type { Booking } from "@/types/bookings";

export default function StudentRequests() {
  const currentUser = useAuthStore((state) => state.user);
  const { data: bookings = [], isLoading } = useBookingsQuery();
  const createPaymentMutation = useCreatePaymentMutation();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [paymentReference, setPaymentReference] = useState("");
  const [paidBookingIds, setPaidBookingIds] = useState<string[]>([]);

  const myRequests = bookings.filter((booking) => booking.studentId === currentUser?.id);

  const handleSubmitPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedBooking) {
      return;
    }

    const amount = Number(selectedBooking.hourlyRate ?? 0);
    if (!amount) {
      toast.error("This booking does not have a valid amount yet.");
      return;
    }

    const transactionId = paymentReference.trim() || `txn-${paymentMethod}-${Date.now()}`;

    createPaymentMutation.mutate(
      {
        teacherId: selectedBooking.teacherId,
        packageId: (selectedBooking as Booking & { packageId?: string }).packageId ?? selectedBooking._id,
        bookingId: selectedBooking._id,
        amount,
        transactionId,
        method: paymentMethod,
      },
      {
        onSuccess: () => {
          setPaidBookingIds((previous) => [...previous, selectedBooking._id]);
          setSelectedBooking(null);
          setPaymentMethod("esewa");
          setPaymentReference("");
          toast.success("Payment submitted successfully.");
        },
        onError: (error) => {
          toast.error(error.message || "Unable to process the payment right now.");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">My Requests</CardTitle>
          <CardDescription>Track hire requests sent to teachers and their latest response.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-2 h-3 w-48" />
                </div>
              ))}
            </div>
          ) : myRequests.length ? (
            myRequests.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">Teacher: {booking.teacherId}</p>
                    <p className="text-sm text-slate-600">Subject: {booking.subject || "Not provided"}</p>
                    <p className="text-sm text-slate-600">Hourly Rate: ${booking.hourlyRate ?? 0}</p>
                    <p className="text-sm text-slate-600">Requested: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                  <Badge variant={booking.status === "accepted" ? "secondary" : "outline"}>
                    {booking.status || "Pending"}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {booking.status === "accepted" ? (
                    <>
                      <Button size="sm" onClick={() => setSelectedBooking(booking)} disabled={paidBookingIds.includes(booking._id)}>
                        {paidBookingIds.includes(booking._id) ? "Paid" : "Pay Now"}
                      </Button>
                      <Link href="/messages">
                        <Button size="sm" variant="outline">Message Teacher</Button>
                      </Link>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600">No booking requests yet.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => (!open ? setSelectedBooking(null) : undefined)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay for this booking</DialogTitle>
            <DialogDescription>Choose a payment method to complete your booking securely.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmitPayment}>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment method</Label>
              <Select id="payment-method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="esewa">Esewa</option>
                <option value="khalti">Khalti</option>
                <option value="mobile-banking">Mobile Banking</option>
                <option value="card">Debit/Credit Card</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-reference">Reference / Transaction ID</Label>
              <Input
                id="payment-reference"
                value={paymentReference}
                onChange={(event) => setPaymentReference(event.target.value)}
                placeholder="Optional reference"
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Amount</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                ${selectedBooking?.hourlyRate ?? 0}
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setSelectedBooking(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createPaymentMutation.isPending}>
                {createPaymentMutation.isPending ? "Processing..." : "Pay now"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
