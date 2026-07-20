"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const createBookingMutation = useCreateBookingMutation();

  const isStudent = currentUser?.role === "student";

  const handleHire = () => {
    if (!teacherId || !isStudent) {
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
          toast.success("Hire request successfully Sent");
          router.push("/student/requests");
        },
        onError: () => {
          toast.error("Unable to send hire request right now.");
        },
      },
    );
  };

  if (!isStudent) {
    return null;
  }

  return (
    <Button onClick={handleHire} disabled={createBookingMutation.isPending}>
      {createBookingMutation.isPending ? "Sending..." : "Hire Teacher"}
    </Button>
  );
}
