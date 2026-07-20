"use client";

import { BookOpen, ImagePlus, Mail, Phone, Save, Shield, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUpdateStudentProfileMutation, useUpdateUserAvatarMutation } from "@/hooks/useMutationHooks";
import { useCurrentStudentQuery, useCurrentTeacherQuery } from "@/hooks/useQueryHooks";
import { useAuthStore } from "@/store/useAuthStore";

const parseCommaSeparated = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);

export default function ProfilePage() {
  const currentUser = useAuthStore((state) => state.user);
  const isStudent = currentUser?.role === "student";

  const { data: studentResponse, isLoading: studentLoading, error: studentError, refetch: refetchStudent } = useCurrentStudentQuery(isStudent);
  const { data: teacherResponse, isLoading: teacherLoading, error: teacherError } = useCurrentTeacherQuery(!isStudent);

  const updateProfileMutation = useUpdateStudentProfileMutation();
  const updateAvatarMutation = useUpdateUserAvatarMutation();

  const studentProfile = studentResponse?.data?.profile;
  const studentUser = studentResponse?.data?.user;
  const teacherProfile = teacherResponse?.data?.profile;
  const teacherUser = teacherResponse?.data?.user;

  const initials = `${(isStudent ? studentUser?.firstName : teacherUser?.firstName)?.[0] ?? "U"}${(isStudent ? studentUser?.lastName : teacherUser?.lastName)?.[0] ?? ""}`;
  const fullName = `${isStudent ? studentUser?.firstName : teacherUser?.firstName ?? ""} ${isStudent ? studentUser?.lastName : teacherUser?.lastName ?? ""}`.trim() || "Profile";
  const avatarUrl = isStudent ? studentUser?.avatar ?? undefined : teacherUser?.avatar ?? undefined;

  const [bio, setBio] = useState("");
  const [preferredSubjects, setPreferredSubjects] = useState("");
  const [learningGoals, setLearningGoals] = useState("");
  const [interests, setInterests] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(1.2);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!studentProfile) {
      return;
    }

    setBio(studentProfile.bio ?? "");
    setPreferredSubjects((studentProfile.preferredSubjects ?? []).join(", "));
    setLearningGoals((studentProfile.learningGoals ?? []).join(", "));
    setInterests((studentProfile.interests ?? []).join(", "));
  }, [studentProfile]);

  if (studentLoading || teacherLoading) {
    return (
      <div className="space-y-4">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-16 w-16 rounded-full bg-slate-200" />
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-60 rounded bg-slate-100" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isStudent) {
    if (studentError || !studentProfile || !studentUser) {
      return (
        <Card className="rounded-3xl border border-rose-200 bg-rose-50 text-rose-700 shadow-sm">
          <CardContent className="p-6">Unable to load your profile right now.</CardContent>
        </Card>
      );
    }
  } else if (teacherError || !teacherProfile || !teacherUser) {
    return (
      <Card className="rounded-3xl border border-rose-200 bg-rose-50 text-rose-700 shadow-sm">
        <CardContent className="p-6">Unable to load your profile right now.</CardContent>
      </Card>
    );
  }

  const handleAvatarPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const cropAvatarAndUpload = async () => {
    if (!avatarFile || !avatarPreview) {
      return;
    }

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = avatarPreview;
    });

    const canvas = document.createElement("canvas");
    const cropSize = 512;
    canvas.width = cropSize;
    canvas.height = cropSize;

    const context = canvas.getContext("2d");

    if (!context) {
      toast.error("Unable to process the image on this device.");
      return;
    }

    const targetWidth = image.width;
    const targetHeight = image.height;
    const minSource = Math.min(targetWidth, targetHeight);
    const sourceX = Math.max(0, (targetWidth - minSource) / 2 + offsetX * (targetWidth / 240));
    const sourceY = Math.max(0, (targetHeight - minSource) / 2 + offsetY * (targetHeight / 240));
    const sourceSize = minSource / zoom;

    context.clearRect(0, 0, cropSize, cropSize);
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceSize,
      sourceSize,
      0,
      0,
      cropSize,
      cropSize,
    );

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));

    if (!blob) {
      toast.error("Unable to generate the cropped avatar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", blob, avatarFile.name || "avatar.jpg");

    updateAvatarMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile picture updated successfully.");
        setAvatarPreview(null);
        setAvatarFile(null);
        refetchStudent();
      },
      onError: () => {
        toast.error("Unable to save the profile picture right now.");
      },
    });
  };

  const handleSave = () => {
    updateProfileMutation.mutate(
      {
        bio,
        preferredSubjects: parseCommaSeparated(preferredSubjects),
        learningGoals: parseCommaSeparated(learningGoals),
        interests: parseCommaSeparated(interests),
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully.");
          refetchStudent();
        },
        onError: () => {
          toast.error("Unable to update the profile right now.");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                  <AvatarImage src={avatarUrl} alt={fullName} className="object-cover" />
                  <AvatarFallback className="bg-violet-100 text-violet-700 text-lg font-semibold">{initials}</AvatarFallback>
                </Avatar>
                {isStudent ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm"
                  >
                    <ImagePlus className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">{fullName}</CardTitle>
                <CardDescription className="text-sm text-slate-600">{isStudent ? "Edit your own student profile and crop the new avatar before saving." : "Teacher profile details are loaded from the backend profile contract."}</CardDescription>
              </div>
            </div>
            <Badge className="w-fit border-none bg-violet-100 text-violet-700">
              <Shield className="mr-1 h-3.5 w-3.5" />
              {currentUser?.role ?? "user"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {isStudent ? (
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{studentUser?.email ?? "Email unavailable"}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{studentUser?.phone ?? "Phone not shared"}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  <span>{studentUser?.gender ?? "Gender not provided"}</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Crop avatar before upload</p>
                  <div className="mt-3 flex flex-col gap-3">
                    <div className="mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar preview"
                          className="h-full w-full object-cover"
                          style={{ transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)` }}
                        />
                      ) : (
                        <span className="text-sm text-slate-500">No new image selected</span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-slate-600">
                      <label className="flex items-center justify-between gap-3">
                        <span>Zoom</span>
                        <input type="range" min="1" max="2.4" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-40" />
                      </label>
                      <label className="flex items-center justify-between gap-3">
                        <span>Horizontal shift</span>
                        <input type="range" min="-60" max="60" step="1" value={offsetX} onChange={(event) => setOffsetX(Number(event.target.value))} className="w-40" />
                      </label>
                      <label className="flex items-center justify-between gap-3">
                        <span>Vertical shift</span>
                        <input type="range" min="-60" max="60" step="1" value={offsetY} onChange={(event) => setOffsetY(Number(event.target.value))} className="w-40" />
                      </label>
                    </div>

                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Select Image
                    </Button>
                    {avatarPreview ? (
                      <Button type="button" onClick={cropAvatarAndUpload} disabled={updateAvatarMutation.isPending}>
                        {updateAvatarMutation.isPending ? "Saving Avatar..." : "Save Avatar"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.24em] text-slate-400">Bio</label>
                  <textarea value={bio} onChange={(event) => setBio(event.target.value)} className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.24em] text-slate-400">Preferred Subjects</label>
                    <Input className="mt-2" value={preferredSubjects} onChange={(event) => setPreferredSubjects(event.target.value)} placeholder="Math, Physics, English" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.24em] text-slate-400">Learning Goals</label>
                    <Input className="mt-2" value={learningGoals} onChange={(event) => setLearningGoals(event.target.value)} placeholder="Improve algebra, exam prep" />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.24em] text-slate-400">Interests</label>
                  <Input className="mt-2" value={interests} onChange={(event) => setInterests(event.target.value)} placeholder="Reading, coding, research" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSave} disabled={updateProfileMutation.isPending}>
                    <Save className="mr-2 h-4 w-4" />
                    {updateProfileMutation.isPending ? "Saving Profile..." : "Save Profile"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Email</span>
                  <span className="mt-1 block">{teacherUser?.email ?? "Email unavailable"}</span>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Phone</span>
                  <span className="mt-1 block">{teacherUser?.phone ?? "Phone not shared"}</span>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Gender</span>
                  <span className="mt-1 block">{teacherUser?.gender ?? "Gender not provided"}</span>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Hourly Rate</span>
                  <span className="mt-1 block">${teacherProfile?.hourlyRate ?? 0}/hr</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bio</p>
                <p className="mt-2 text-sm text-slate-700">{teacherProfile?.bio || "No bio available."}</p>
              </div>

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
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {isStudent ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Preferred Subjects</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(studentProfile?.preferredSubjects ?? []).map((subject) => (
                    <Badge key={subject} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Learning Goals</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(studentProfile?.learningGoals ?? []).map((goal) => (
                    <Badge key={goal} variant="outline">{goal}</Badge>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Interests</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(studentProfile?.interests ?? []).map((interest) => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <BookOpen className="h-4 w-4 text-violet-600" />
              {isStudent ? "Your profile is now editable from the existing backend-backed student contract." : "Your teacher profile is loaded from the backend profile contract."}
            </div>
            <p className="mt-2">{isStudent ? "You can update your bio, subjects, goals, interests, and crop a new avatar before uploading and saving." : "Your profile details are surfaced directly from the teacher backend response."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
