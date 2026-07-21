"use client";

import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Sparkles,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  useBookingsQuery,
  useCurrentTeacherPackagesQuery,
  useCurrentTeacherQuery,
  useStudentProfileQuery,
  useTeacherOverviewQuery,
  useTeacherStudentsQuery,
} from "@/hooks/useQueryHooks";
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useUpdateBookingStatusMutation,
  useUpdatePackageMutation,
  useUpdateTeacherAvailabilityMutation,
} from "@/hooks/useMutationHooks";
import { useAuthStore } from "@/store/useAuthStore";
import type { Booking } from "@/types/bookings";
import type { Package } from "@/types/package";

import { TeacherHero } from "./TeacherHero";

type PackageFormValues = {
  name: string;
  description: string;
  price: number;
  durationInHours: number;
  sessions: number;
  isActive?: boolean;
};

export default function TeacherDashboard() {
  const user = useAuthStore((state) => state.user);
  const [availabilityInput, setAvailabilityInput] = useState("");
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Package | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingActionId, setBookingActionId] = useState<string | null>(null);

  const { data: teacherProfileResponse, isLoading: teacherProfileLoading } = useCurrentTeacherQuery();
  const { data: overviewResponse, isLoading: overviewLoading } = useTeacherOverviewQuery();
  const { data: students = [], isLoading: studentsLoading } = useTeacherStudentsQuery();
  const { data: teacherPackages = [], isLoading: packagesLoading } = useCurrentTeacherPackagesQuery();
  const { data: bookings = [], isLoading: bookingsLoading } = useBookingsQuery();
  const { data: selectedStudentProfile, isLoading: selectedStudentProfileLoading } = useStudentProfileQuery(selectedBooking?.studentId);
  const updateAvailabilityMutation = useUpdateTeacherAvailabilityMutation();
  const createPackageMutation = useCreatePackageMutation();
  const updatePackageMutation = useUpdatePackageMutation();
  const deletePackageMutation = useDeletePackageMutation();

  const teacherProfile = teacherProfileResponse?.data?.profile;
  const teacherUser = teacherProfileResponse?.data?.user;
  const overview = overviewResponse?.data;
  const updateBookingStatusMutation = useUpdateBookingStatusMutation();

  const normalizeStatus = (status: string | undefined) => status?.toLowerCase() ?? "";
  const isPendingBooking = (booking: Booking) => ["pending", "requested", "awaiting", "in_review"].includes(normalizeStatus(booking.status));
  const isAcceptedBooking = (booking: Booking) => ["accepted", "approved", "confirmed", "active"].includes(normalizeStatus(booking.status));

  const pendingBookings = bookings.filter((booking) => isPendingBooking(booking));
  const acceptedStudents = bookings.filter((booking) => isAcceptedBooking(booking));

  const stats = useMemo(
    () => [
      {
        title: "Total Students",
        value: `${overview?.totalStudents ?? students.length}`,
        description: "Registered learners",
        icon: Users,
        accent: "blue" as const,
      },
      {
        title: "Pending Requests",
        value: `${overview?.pendingRequests ?? 0}`,
        description: "New requests",
        icon: MessageCircle,
        accent: "violet" as const,
      },
      {
        title: "Monthly Earnings",
        value: `$${overview?.monthlyEarnings ?? 0}`,
        description: "This month",
        icon: CreditCard,
        accent: "indigo" as const,
      },
      {
        title: "Average Rating",
        value: `${teacherProfile?.rating ?? 0}`,
        description: "Teacher rating",
        icon: Star,
        accent: "teal" as const,
      },
    ],
    [overview, students.length, teacherProfile?.rating],
  );

  const initials = `${teacherUser?.firstName?.[0] ?? "T"}${teacherUser?.lastName?.[0] ?? ""}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<PackageFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      durationInHours: 1,
      sessions: 1,
      isActive: true,
    },
  });

  const openCreateDialog = () => {
    setEditingPackage(null);
    reset({
      name: "",
      description: "",
      price: 0,
      durationInHours: 1,
      sessions: 1,
      isActive: true,
    });
    setPackageDialogOpen(true);
  };

  const openEditDialog = (pkg: Package) => {
    setEditingPackage(pkg);
    reset({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      durationInHours: pkg.durationInHours,
      sessions: pkg.sessions,
      isActive: pkg.isActive,
    });
    setPackageDialogOpen(true);
  };

  const handlePackageSubmit = (values: PackageFormValues) => {
    clearErrors();

    if (!values.name.trim()) {
      setError("name", { type: "manual", message: "Package name is required" });
      return;
    }

    if (!values.description.trim()) {
      setError("description", { type: "manual", message: "Description is required" });
      return;
    }

    const price = Number(values.price);
    const durationInHours = Number(values.durationInHours);
    const sessions = Number(values.sessions);

    if (Number.isNaN(price) || price < 0) {
      setError("price", { type: "manual", message: "Price must be 0 or greater" });
      return;
    }

    if (Number.isNaN(durationInHours) || durationInHours < 1) {
      setError("durationInHours", { type: "manual", message: "Duration must be at least 1" });
      return;
    }

    if (Number.isNaN(sessions) || sessions < 1) {
      setError("sessions", { type: "manual", message: "Sessions must be at least 1" });
      return;
    }

    const payload = {
      name: values.name.trim(),
      description: values.description.trim(),
      price,
      durationInHours,
      sessions,
      isActive: values.isActive ?? true,
    };

    if (editingPackage) {
      updatePackageMutation.mutate(
        { packageId: editingPackage._id, payload },
        {
          onSuccess: () => {
            toast.success("Package updated successfully.");
            setPackageDialogOpen(false);
            setEditingPackage(null);
          },
          onError: (error) => {
            toast.error(error.message || "Unable to update package.");
          },
        },
      );
      return;
    }

    createPackageMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Package created successfully.");
        setPackageDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error.message || "Unable to create package.");
      },
    });
  };

  const handleDelete = (pkg: Package) => {
    setDeleteTarget(pkg);
  };

  const handleBookingAction = (booking: Booking, status: string) => {
    setBookingActionId(booking._id);

    updateBookingStatusMutation.mutate(
      { bookingId: booking._id, payload: { status } },
      {
        onSuccess: () => {
          const message = status === "accepted" ? "Booking accepted." : "Booking rejected.";
          toast.success(message);
          setBookingActionId(null);
          setSelectedBooking(null);
        },
        onError: (error: Error) => {
          setBookingActionId(null);
          toast.error(error.message || "Unable to update booking request.");
        },
      },
    );
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    deletePackageMutation.mutate(deleteTarget._id, {
      onSuccess: () => {
        toast.success("Package deleted successfully.");
        setDeleteTarget(null);
      },
      onError: (error) => {
        toast.error(error.message || "Unable to delete package.");
      },
    });
  };

  if (overviewLoading || teacherProfileLoading) {
    return (
      <div className="space-y-6">
        <TeacherHero greetingName={user?.firstName ?? "Teacher"} packageCount={0} />
        <div className="grid gap-4 xl:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.title} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-8 w-20 rounded bg-slate-200" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const handleAvailabilitySave = () => {
    const parsed = availabilityInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateAvailabilityMutation.mutate({ availability: parsed });
  };

  return (
    <div className="space-y-6">
      <TeacherHero greetingName={teacherUser?.firstName ?? user?.firstName ?? "Teacher"} packageCount={overview?.totalStudents ?? students.length} />

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Teacher Information</CardTitle>
            <CardDescription className="text-sm">Your profile details are synced from the backend.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-lg font-semibold text-violet-700">
                {initials}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">{teacherUser?.firstName} {teacherUser?.lastName}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{teacherUser?.role ?? "teacher"}</Badge>
                  <Badge variant="outline">{teacherUser?.gender ?? "Gender not shared"}</Badge>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4" />{teacherUser?.email}</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{teacherUser?.phone ?? "Phone not shared"}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Subjects</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(teacherProfile?.subjects ?? []).map((subject) => (
                    <Badge key={subject} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Availability</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(teacherProfile?.availability ?? []).map((slot) => (
                    <Badge key={slot} variant="secondary">{slot}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Hourly Rate</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">${teacherProfile?.hourlyRate ?? 0}/hr</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Reviews</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{teacherProfile?.totalReviews ?? 0} total reviews</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bio</p>
              <p className="mt-2 text-sm text-slate-700">{teacherProfile?.bio || "No bio provided."}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Education</p>
                <p className="mt-2 text-sm text-slate-700">{teacherProfile?.education?.join(", ") || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Experience</p>
                <p className="mt-2 text-sm text-slate-700">{teacherProfile?.experience?.join(", ") || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Teacher Availability</CardTitle>
            <CardDescription className="text-sm">Use the existing availability endpoint to update your open slots.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={availabilityInput}
              onChange={(event) => setAvailabilityInput(event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
              placeholder="Monday 9AM-12PM, Tuesday 2PM-6PM"
            />
            <div className="flex flex-wrap gap-2">
              {(teacherProfile?.availability ?? []).map((slot) => (
                <Badge key={slot} variant="outline">{slot}</Badge>
              ))}
            </div>
            <Button onClick={handleAvailabilitySave} disabled={updateAvailabilityMutation.isPending} className="w-full md:w-auto">
              {updateAvailabilityMutation.isPending ? "Saving..." : "Save Availability"}
            </Button>
            {updateAvailabilityMutation.isError ? (
              <p className="text-sm text-rose-600">Unable to update availability right now.</p>
            ) : null}
            {updateAvailabilityMutation.isSuccess ? (
              <p className="text-sm text-emerald-600">Availability updated successfully.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">My Packages</CardTitle>
              <CardDescription className="text-sm">Create, edit, and remove the packages that students can view.</CardDescription>
            </div>
            <Button onClick={openCreateDialog} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Package
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {packagesLoading ? (
            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : teacherPackages.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {teacherPackages.map((pkg) => (
                <div key={pkg._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{pkg.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{pkg.description}</p>
                    </div>
                    <Badge variant={pkg.isActive ? "secondary" : "outline"}>{pkg.isActive ? "Active" : "Inactive"}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                    <span>${pkg.price}</span>
                    <span>•</span>
                    <span>{pkg.durationInHours}h</span>
                    <span>•</span>
                    <span>{pkg.sessions} sessions</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(pkg)} className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(pkg)} className="flex items-center gap-2 text-rose-600 hover:text-rose-700">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              No packages available.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Pending Requests</CardTitle>
                <CardDescription className="text-sm">New booking requests from students that need your response.</CardDescription>
              </div>
              <MessageCircle className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookingsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-40 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : pendingBookings.length ? (
              pendingBookings.map((booking) => {
                const studentUser = booking.student?.user;
                const initial = `${studentUser?.firstName?.[0] ?? "S"}${studentUser?.lastName?.[0] ?? ""}`;

                return (
                  <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={studentUser?.avatar ?? undefined} alt={studentUser ? `${studentUser.firstName ?? "Student"} ${studentUser.lastName ?? ""}` : "Student avatar"} />
                          <AvatarFallback>{initial}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{studentUser ? `${studentUser.firstName ?? "Student"} ${studentUser.lastName ?? ""}`.trim() : "Student"}</p>
                          <p className="text-sm text-slate-600">{booking.subject || "Subject not provided"}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{booking.status || "Pending"}</Badge>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                      <p><span className="font-medium text-slate-900">Hourly Rate:</span> ${booking.hourlyRate ?? 0}</p>
                      <p><span className="font-medium text-slate-900">Requested:</span> {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}</p>
                      <p className="md:col-span-2"><span className="font-medium text-slate-900">Notes:</span> {booking.notes || "No notes provided."}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                        View Profile
                      </Button>
                      <Button size="sm" onClick={() => handleBookingAction(booking, "accepted")} disabled={bookingActionId === booking._id}>
                        {bookingActionId === booking._id ? "Processing..." : "Accept"}
                      </Button>
                      <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700" onClick={() => handleBookingAction(booking, "rejected")} disabled={bookingActionId === booking._id}>
                        {bookingActionId === booking._id ? "Processing..." : "Reject"}
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No pending booking requests.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Accepted Students</CardTitle>
                <CardDescription className="text-sm">Students moved into your active roster after acceptance.</CardDescription>
              </div>
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookingsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-56 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : acceptedStudents.length ? (
              acceptedStudents.map((booking) => {
                const studentUser = booking.student?.user;
                const initial = `${studentUser?.firstName?.[0] ?? "S"}${studentUser?.lastName?.[0] ?? ""}`;

                return (
                  <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={studentUser?.avatar ?? undefined} alt={studentUser ? `${studentUser.firstName ?? "Student"} ${studentUser.lastName ?? ""}` : "Student avatar"} />
                          <AvatarFallback>{initial}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{studentUser ? `${studentUser.firstName ?? "Student"} ${studentUser.lastName ?? ""}`.trim() : "Student"}</p>
                          <p className="text-sm text-slate-600">{booking.subject || "Subject not provided"}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{booking.status || "Accepted"}</Badge>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                      <p><span className="font-medium text-slate-900">Active Package:</span> {booking.packageName || booking.package?.name || "No Package Assigned"}</p>
                      <p><span className="font-medium text-slate-900">Status:</span> Active</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" disabled className="text-slate-500">
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No accepted students yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Teacher Students</CardTitle>
                <CardDescription className="text-sm">Assigned students returned by the backend.</CardDescription>
              </div>
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-56 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : students.length ? (
              students.map((student) => (
                <div key={student._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{student.user?.firstName ?? "Student"} {student.user?.lastName ?? ""}</p>
                      <p className="text-sm text-slate-600">{student.user?.email ?? "Email unavailable"}</p>
                    </div>
                    <Badge variant="secondary">{student.status ?? "Active"}</Badge>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                    <p><span className="font-medium text-slate-900">Package:</span> {student.packageName ?? "N/A"}</p>
                    <p><span className="font-medium text-slate-900">Progress:</span> {student.progress ?? 0}%</p>
                    <p><span className="font-medium text-slate-900">Last class:</span> {student.lastClass ?? "N/A"}</p>
                    <p><span className="font-medium text-slate-900">Next class:</span> {student.nextClass ?? "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No students are assigned yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Teaching Snapshot</CardTitle>
            <CardDescription className="text-sm">Live overview from the teacher dashboard response.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Upcoming Sessions</span>
              <span className="text-base font-semibold text-slate-900">{overview?.upcomingSessions ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Confirmed Bookings</span>
              <span className="text-base font-semibold text-slate-900">{overview?.confirmedBookings ?? 0}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Today Sessions</span>
              <span className="text-base font-semibold text-slate-900">{overview?.todaySessions ?? 0}</span>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 text-sm text-violet-700">
              <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4" /> Teacher profile</div>
              <p className="mt-2">The backend response currently surfaces the profile, ratings, subjects, availability, and teaching overview.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => {
        if (!open) {
          setSelectedBooking(null);
        }
      }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Read-only profile details for this student booking.</DialogDescription>
          </DialogHeader>
          {selectedStudentProfileLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedStudentProfile?.data?.user?.avatar ?? undefined} alt="Student profile" />
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

      <Dialog open={packageDialogOpen} onOpenChange={(open) => {
        setPackageDialogOpen(open);
        if (!open) {
          setEditingPackage(null);
        }
      }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingPackage ? "Edit Package" : "Create Package"}</DialogTitle>
            <DialogDescription>Use the form below to manage your tutoring packages.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(handlePackageSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Package Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : null}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
                {errors.description ? <p className="text-sm text-rose-600">{errors.description.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" {...register("price")} />
                {errors.price ? <p className="text-sm text-rose-600">{errors.price.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="durationInHours">Duration (hours)</Label>
                <Input id="durationInHours" type="number" {...register("durationInHours")} />
                {errors.durationInHours ? <p className="text-sm text-rose-600">{errors.durationInHours.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessions">Sessions</Label>
                <Input id="sessions" type="number" {...register("sessions")} />
                {errors.sessions ? <p className="text-sm text-rose-600">{errors.sessions.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="isActive">Status</Label>
                <select id="isActive" className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3" {...register("isActive")}> 
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPackageDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createPackageMutation.isPending || updatePackageMutation.isPending}>
                {createPackageMutation.isPending || updatePackageMutation.isPending ? "Saving..." : editingPackage ? "Save Changes" : "Create Package"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
            <DialogDescription>Are you sure you want to remove this package? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deletePackageMutation.isPending}>
              {deletePackageMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><Briefcase className="h-4 w-4" /> Profile</div>
            <p className="mt-3 text-sm text-slate-700">Complete teacher information is shown above and is rendered from the existing backend response.</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><CalendarDays className="h-4 w-4" /> Availability</div>
            <p className="mt-3 text-sm text-slate-700">This uses the existing PATCH availability endpoint and updates the UI after a successful response.</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><Users className="h-4 w-4" /> Students</div>
            <p className="mt-3 text-sm text-slate-700">List of assigned students is shown with loading and empty states.</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><CheckCircle2 className="h-4 w-4" /> Reviews</div>
            <p className="mt-3 text-sm text-slate-700">Ratings and review counts are surfaced directly from the teacher profile response.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
