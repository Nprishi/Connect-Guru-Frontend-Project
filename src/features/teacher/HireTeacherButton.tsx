"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
        subject: subject || "General Tutoring",
        hourlyRate: hourlyRate ?? 0,
        notes: `Hire request for ${teacherName}`,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setMessage("Request sent successfully. It has been added to the teacher's queue.");
          toast.success("Hire request sent successfully.");
        },
        onError: (error) => {
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
      <Button onClick={handleHire} disabled={createBookingMutation.isPending}>
        {createBookingMutation.isPending ? "Sending..." : "Hire Teacher"}
      </Button>

      {message ? (
        <p className={`text-sm font-medium ${isSuccess ? "text-emerald-700" : "text-rose-700"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
