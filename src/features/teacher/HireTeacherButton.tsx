"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookingMutation } from "@/hooks/useMutationHooks";
import { useAuthStore } from "@/store/useAuthStore";

interface HireTeacherButtonProps {
  teacherId: string;
  teacherName: string;
  subject?: string;
  hourlyRate?: number;
}

export default function HireTeacherButton({
  teacherId,
  teacherName,
  subject,
  hourlyRate,
}: HireTeacherButtonProps) {
  const currentUser = useAuthStore((state) => state.user);
  const createBookingMutation = useCreateBookingMutation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState({
    subject: subject || "General Tutoring",
    hourlyRate: hourlyRate ?? 0,
    notes: `Hire request for ${teacherName}`,
  });

  const isStudent = currentUser?.role === "student";

  const handleHire = () => {
    if (!teacherId || !isStudent) {
      setMessage("Please sign in as a student to send a hire request.");
      setIsSuccess(false);
      return;
    }

    createBookingMutation.mutate(
      {
        teacherId,
        subject: formState.subject.trim() || "General Tutoring",
        hourlyRate: Number(formState.hourlyRate) || 0,
        notes: formState.notes.trim() || `Hire request for ${teacherName}`,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setMessage("Request sent successfully. It has been added to the teacher's queue.");
          toast.success("Hire request sent successfully.");
          setOpen(false);
        },
        onError: (error: Error) => {
          setIsSuccess(false);
          setMessage(error.message || "Unable to send hire request right now.");
          toast.error(error.message || "Unable to send hire request right now.");
        },
      },
    );
  };

  if (!isStudent) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button onClick={() => setOpen(true)} disabled={createBookingMutation.isPending}>
        {createBookingMutation.isPending ? "Sending..." : "Hire Teacher"}
      </Button>

      {message ? (
        <p className={`text-sm font-medium ${isSuccess ? "text-emerald-700" : "text-rose-700"}`}>
          {message}
        </p>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Hire Teacher</DialogTitle>
            <DialogDescription>Send a booking request with the subject, hourly rate, and any notes for the teacher.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formState.subject}
                onChange={(event) => setFormState((current) => ({ ...current, subject: event.target.value }))}
                placeholder="Mathematics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                step="1"
                value={formState.hourlyRate}
                onChange={(event) => setFormState((current) => ({ ...current, hourlyRate: Number(event.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formState.notes}
                onChange={(event) => setFormState((current) => ({ ...current, notes: event.target.value }))}
                placeholder="Let the teacher know what you need help with."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleHire} disabled={createBookingMutation.isPending}>
              {createBookingMutation.isPending ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
