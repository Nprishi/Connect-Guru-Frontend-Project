/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
// import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function StudentCard({ student }: any) {
    return (
        <div className="rounded-2xl border bg-white p-5 hover:shadow-lg transition">

            <div className="flex justify-between">

                <div className="flex gap-4">

                    <img
                        src={student.avatar || "/avatar.png"}
                        className="h-16 w-16 rounded-full object-cover"
                    />

                    <div>

                        <h2 className="font-semibold text-lg">
                            {student.fullName}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {student.email}
                        </p>

                        <p className="mt-2 text-sm font-medium">
                            {student.packageName}
                        </p>

                    </div>

                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {student.status}
                </span>

            </div>

            <div className="mt-5">

                <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                </div>

                {/* <Progress
                    className="mt-2"
                    value={student.progress}
                /> */}

            </div>

            <div className="grid grid-cols-2 mt-5 text-sm">

                <div>

                    <p className="text-gray-500">
                        Last Class
                    </p>

                    <p>{student.lastClass}</p>

                </div>

                <div>

                    <p className="text-gray-500">
                        Next Class
                    </p>

                    <p>{student.nextClass}</p>

                </div>

            </div>

            <Button
                className="mt-5 w-full rounded-xl"
                variant="outline"
            >
                View Profile
            </Button>

        </div>
    );
}