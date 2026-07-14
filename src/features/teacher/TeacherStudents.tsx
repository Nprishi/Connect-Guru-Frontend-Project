"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { getTeacherStudents } from "@/api/teacher.api";
import StudentCard from "../student/studentCard";
// import StudentSkeleton from "./StudentSkeleton";

interface Student {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  packageName: string;
  progress: number;
  lastClass: string;
  nextClass: string;
  status: "Active" | "Completed";
}

export default function TeacherStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getTeacherStudents(user?.id);
        setStudents(res.data.data ?? res.data ?? []);
      } catch (err) {
        console.error("Failed to fetch teacher students:", err);
        setError("Unable to load student list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user?.id]);

  const filtered = students.filter((student) =>
    student.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            My Students
          </h1>

          <p className="text-gray-500">
            Manage your enrolled students and monitor their learning progress.
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search student..."
            className="pl-10 h-11 rounded-xl border w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-5">

        <div className="rounded-2xl bg-white border p-5">
          <h3 className="text-sm text-gray-500">
            Total Students
          </h3>

          <p className="text-3xl font-bold">
            {students.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white border p-5">
          <h3 className="text-sm text-gray-500">
            Active
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {students.filter(i => i.status === "Active").length}
          </p>
        </div>

        <div className="rounded-2xl bg-white border p-5">
          <h3 className="text-sm text-gray-500">
            Completed
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {students.filter(i => i.status === "Completed").length}
          </p>
        </div>

      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Students */}

      <div className="grid lg:grid-cols-2 gap-5">

        {/* {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <StudentSkeleton key={index} />
          ))} */}

        {!loading &&
          filtered.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
            />
          ))}

      </div>

    </div>
  );
}