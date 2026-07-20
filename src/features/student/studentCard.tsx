/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import type { TeacherStudent } from "@/types/teacher";

export default function StudentCard({ student }: { student: TeacherStudent }) {
  const fullName = `${student.user?.firstName ?? ""} ${student.user?.lastName ?? ""}`.trim();
  const status = student.status ?? "Active";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <img
            src={student.user?.avatar || "/avatar.png"}
            alt={fullName || "Student avatar"}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{fullName || "Student"}</h2>
            <p className="text-sm text-slate-500">{student.user?.email ?? "Email unavailable"}</p>
            <p className="mt-2 text-sm font-medium text-slate-700">{student.packageName ?? "Package not available"}</p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.toLowerCase() === "active"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-blue-100 text-blue-700"}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Progress</span>
          <span className="font-medium text-slate-900">{student.progress ?? 0}%</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <div>
          <p className="text-slate-500">Last Class</p>
          <p className="text-slate-700">{student.lastClass ?? "N/A"}</p>
        </div>
        <div>
          <p className="text-slate-500">Next Class</p>
          <p className="text-slate-700">{student.nextClass ?? "N/A"}</p>
        </div>
      </div>

      <Button className="mt-5 w-full rounded-xl" variant="outline">
        View Profile
      </Button>
    </div>
  );
}