"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import StudentCard from "@/features/student/studentCard";
import { Input } from "@/components/ui/input";
import { useTeacherStudentsQuery } from "@/hooks/useQueryHooks";

export default function TeacherStudents() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useTeacherStudentsQuery();
  const students = Array.isArray(data) ? data : [];

  const filtered = useMemo(
    () => students.filter((student) => {
      const fullName = `${student.user?.firstName ?? ""} ${student.user?.lastName ?? ""}`.trim();
      return fullName.toLowerCase().includes(search.toLowerCase());
    }),
    [search, students],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Students</h1>
          <p className="text-sm text-slate-500">Manage your enrolled students and monitor their learning progress.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <Input
            placeholder="Search student..."
            className="pl-10"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Students</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{students.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{students.filter((student) => (student.status ?? "Active").toLowerCase() === "active").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{students.filter((student) => (student.status ?? "").toLowerCase() === "completed").length}</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Unable to load your student list right now.
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-16 w-16 rounded-full bg-slate-200" />
              <div className="mt-4 h-4 w-40 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-56 rounded bg-slate-100" />
            </div>
          ))
        ) : filtered.length ? (
          filtered.map((student, index) => {
            const studentKey = student._id ?? student.user?._id ?? student.user?.email ?? `${student.user?.firstName ?? "student"}-${student.user?.lastName ?? "student"}-${index}`;

            return <StudentCard key={studentKey} student={student} />;
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 lg:col-span-2">
            No students match your current search.
          </div>
        )}
      </div>
    </div>
  );
}