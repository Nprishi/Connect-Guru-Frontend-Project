"use client";

import { useEffect, useState, useRef } from "react"; // Fix: useRef थपियो
import { useRouter } from "next/navigation";
import { getOwnProfile } from "@/api/profile.api";
import { getTeacherProfile } from "@/api/teacher.api";
import { getStudentProfile } from "@/api/student.api";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select } from "@/components/ui/select";
import type { UserProfile } from "@/types/user";
import {
  User,
  Mail,
  Shield,
  RefreshCw,
  Save,
  Edit3,
  X,
  ArrowLeft,
  Phone,
  Contact2,
  Activity,
  DollarSign,
  GraduationCap,
  Briefcase,
  BookOpen,
  CalendarDays,
  FileText,
  Target,
  Sparkles,
  Camera // Fix: क्यामेरा आइकन थपियो
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const fileInputRef = useRef<HTMLInputElement>(null); // Fix: फाइल इनपुट रेफरेन्स

  // 1. Core 'users' collection states
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(""); // Fix: एभाटार स्टेट

  // 2. 'teacherprofiles' collection states
  const [subjects, setSubjects] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [teacherBio, setTeacherBio] = useState<string>("");

  // 3. 'studentprofiles' collection states
  const [preferredSubjects, setPreferredSubjects] = useState<string[]>([]);
  const [learningGoals, setLearningGoals] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [studentBio, setStudentBio] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        let currentUser = user;

        if (!currentUser) {
          const response = await getOwnProfile();
          currentUser = response.data;
        }

        if (currentUser) {
          setProfile(currentUser);
          setFirstName(currentUser.firstName ?? "");
          setLastName(currentUser.lastName ?? "");
          setEmail(currentUser.email ?? "");
          setGender(currentUser.gender ?? "other");
          setPhone(currentUser.phone ?? "");
          setAvatar(currentUser.avatar ?? "");

          const role = currentUser.role?.toLowerCase();

          if (role === "teacher" && currentUser.id) {
            try {
              const teacherRes = await getTeacherProfile(currentUser.id);
              const teacherData = teacherRes.data;
              if (teacherData) {
                setSubjects(teacherData.subjects ?? []);
                setEducation(teacherData.education ?? []);
                setExperience(teacherData.experience ?? []);
                setAvailability(teacherData.availability ?? []);
                setHourlyRate(teacherData.hourlyRate ?? 0);
                setTeacherBio(teacherData.bio ?? "");
              }
            } catch (err) {
              console.error("Could not fetch teacher profile details:", err);
            }
          } else if (role === "student" && currentUser.id) {
            try {
              const studentRes = await getStudentProfile(currentUser.id);
              const studentData = studentRes.data;
              if (studentData) {
                setPreferredSubjects(studentData.preferredSubjects ?? []);
                setLearningGoals(studentData.learningGoals ?? []);
                setInterests(studentData.interests ?? []);
                setStudentBio(studentData.bio ?? "");
              }
            } catch (err) {
              console.error("Could not fetch student profile details:", err);
            }
          }
        }
      } catch (error) {
        console.error("Error loading account data:", error);
        setProfile(null);
      }
    }

    fetchUserData();
  }, [user]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);

    }
  };

  function handleSave() {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      firstName,
      lastName,
      email,
      gender,
      phone,
      avatar,
    };

    setProfile(updatedProfile);
    updateUser(updatedProfile);
    setIsEditing(false);
  }

  function handleReset() {
    if (!profile) return;
    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setEmail(profile.email ?? "");
    setGender(profile.gender ?? "other");
    setPhone(profile.phone ?? "");
    setAvatar(profile.avatar ?? "");
  }

  function handleCancel() {
    handleReset();
    setIsEditing(false);
  }

  const initials = profile ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}` : "U";
  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Your profile";
  const roleLabel = profile?.role ?? "Member";
  const statusLabel = profile?.status ?? "inactive";

  const isTeacher = roleLabel.toLowerCase() === "teacher";
  const isStudent = roleLabel.toLowerCase() === "student";

  const inputStyles = `h-12 w-full rounded-[14px] border px-4 text-[15px] transition-all outline-none shadow-none mt-2 ${isEditing
    ? "border-border bg-card text-body focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:outline-none"
    : "border-border/40 bg-muted/30 text-muted-foreground cursor-not-allowed select-none"
    }`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 px-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="h-10 rounded-[14px] gap-2 px-3 text-[14px] font-semibold text-body hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="rounded-[28px] border border-border bg-card shadow-md overflow-hidden">
        <div className="h-3 w-full bg-gradient-to-r from-primary via-[#7C3AED] to-primary/60" />

        <CardHeader className="p-8 md:p-10 border-b border-border/40 bg-muted/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">

            <div className="flex items-center gap-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-background rounded-full ring-4 ring-primary/10 shadow-sm overflow-hidden">
                  <AvatarImage src={avatar || undefined} alt={fullName} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-[32px] uppercase">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="space-y-2.5">
                <CardTitle className="text-[28px] font-extrabold text-heading tracking-tight leading-tight">
                  {fullName}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge className="bg-primary/10 text-primary border-none px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    {roleLabel}
                  </Badge>
                  <Badge className={`border-none px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 ${statusLabel === "active"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-amber-500/10 text-amber-500"
                    }`}>
                    <Activity className="h-3.5 w-3.5" />
                    {statusLabel}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="h-11 rounded-[14px] bg-primary hover:bg-primary-hover text-[14px] font-semibold text-white px-6 shadow-sm flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="h-11 rounded-[14px] bg-primary hover:bg-primary-hover text-[14px] font-semibold text-white px-6 shadow-sm flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="h-11 rounded-[14px] border border-border bg-card text-[14px] font-semibold text-body px-5 flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4 text-muted" />
                    Reset
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleCancel}
                    className="h-11 rounded-[14px] text-[14px] font-semibold text-muted hover:text-body hover:bg-muted px-5 flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 md:p-10 space-y-10">

          <div className="space-y-4">
            <h3 className="text-[16px] font-bold text-primary/80 uppercase tracking-wider">
              Account Information
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-1.5">
                <Label className="text-[14px] font-semibold text-heading flex items-center gap-2 whitespace-nowrap">
                  <User className="h-4 w-4 text-muted" />
                  <span>First Name</span>
                </Label>
                <Input
                  placeholder="First name"
                  value={firstName}
                  disabled={!isEditing}
                  onChange={(event) => setFirstName(event.target.value)}
                  className={inputStyles}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[14px] font-semibold text-heading flex items-center gap-2 whitespace-nowrap">
                  <User className="h-4 w-4 text-muted" />
                  <span>Last Name</span>
                </Label>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  disabled={!isEditing}
                  onChange={(event) => setLastName(event.target.value)}
                  className={inputStyles}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[14px] font-semibold text-heading flex items-center gap-2 whitespace-nowrap">
                  <Phone className="h-4 w-4 text-muted" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  disabled={!isEditing}
                  onChange={(event) => setPhone(event.target.value)}
                  className={inputStyles}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[14px] font-semibold text-heading flex items-center gap-2 whitespace-nowrap">
                  <Contact2 className="h-4 w-4 text-muted" />
                  <span>Gender</span>
                </Label>
                <Select
                  value={gender}
                  disabled={!isEditing}
                  onChange={(event) => setGender(event.target.value)}
                  className={inputStyles}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div className="space-y-1.5 md:col-span-4">
                <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted" />
                  <span>Email Address</span>
                </Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  disabled={true}
                  className="h-12 w-full max-w-md rounded-[14px] border border-border/40 bg-muted/30 text-muted-foreground cursor-not-allowed select-none mt-2 px-4"
                />
              </div>
            </div>
          </div>

          {isTeacher && (
            <>
              <Separator className="bg-border/60" />
              <div className="space-y-6">
                <h3 className="text-[18px] font-bold text-heading tracking-tight flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Teacher Profile Details
                </h3>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  <div className="space-y-1.5">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2 whitespace-nowrap">
                      <DollarSign className="h-4 w-4 text-muted" />
                      <span>Hourly Rate ($)</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="Hourly Rate"
                      value={hourlyRate}
                      disabled={!isEditing}
                      onChange={(event) => setHourlyRate(Number(event.target.value))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-3">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted" />
                      <span>Subjects Taught</span>
                    </Label>
                    <Input
                      placeholder="e.g. Math, Physics (comma separated)"
                      value={subjects.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setSubjects(event.target.value.split(",").map((s) => s.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted" />
                      <span>Education / Degrees</span>
                    </Label>
                    <Input
                      placeholder="e.g. BSc Mathematics (comma separated)"
                      value={education.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setEducation(event.target.value.split(",").map((e) => e.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted" />
                      <span>Professional Experience</span>
                    </Label>
                    <Input
                      placeholder="e.g. 3 years teaching (comma separated)"
                      value={experience.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setExperience(event.target.value.split(",").map((e) => e.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-4">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted" />
                      <span>Availability Days / Hours</span>
                    </Label>
                    <Input
                      placeholder="e.g. Mon-Fri 6-9pm (comma separated)"
                      value={availability.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setAvailability(event.target.value.split(",").map((a) => a.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-4">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted" />
                      <span>Bio & Description</span>
                    </Label>
                    <textarea
                      placeholder="Tell students about yourself..."
                      value={teacherBio}
                      disabled={!isEditing}
                      onChange={(event) => setTeacherBio(event.target.value)}
                      className={`min-h-120px w-full rounded-[14px] border p-4 text-[15px] transition-all outline-none shadow-none mt-2 resize-none ${isEditing
                        ? "border-border bg-card text-body focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:outline-none"
                        : "border-border/40 bg-muted/30 text-muted-foreground cursor-not-allowed select-none"
                        }`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {isStudent && (
            <>
              <Separator className="bg-border/60" />
              <div className="space-y-6">
                <h3 className="text-[18px] font-bold text-heading tracking-tight flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Student Profile Details
                </h3>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted" />
                      <span>Preferred Subjects</span>
                    </Label>
                    <Input
                      placeholder="e.g. Math, Science (comma separated)"
                      value={preferredSubjects.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setPreferredSubjects(event.target.value.split(",").map((s) => s.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted" />
                      <span>Learning Goals</span>
                    </Label>
                    <Input
                      placeholder="e.g. Improve algebra, Pass exams (comma separated)"
                      value={learningGoals.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setLearningGoals(event.target.value.split(",").map((g) => g.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-4">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-muted" />
                      <span>Interests</span>
                    </Label>
                    <Input
                      placeholder="e.g. Robotics, Coding (comma separated)"
                      value={interests.join(", ")}
                      disabled={!isEditing}
                      onChange={(event) => setInterests(event.target.value.split(",").map((i) => i.trim()))}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-4">
                    <Label className="text-[14px] font-semibold text-heading flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted" />
                      <span>Bio & Description</span>
                    </Label>
                    <textarea
                      placeholder="Tell teachers more about yourself..."
                      value={studentBio}
                      disabled={!isEditing}
                      onChange={(event) => setStudentBio(event.target.value)}
                      className={`min-h-[120px] w-full rounded-[14px] border p-4 text-[15px] transition-all outline-none shadow-none mt-2 resize-none ${isEditing
                        ? "border-border bg-card text-body focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:outline-none"
                        : "border-border/40 bg-muted/30 text-muted-foreground cursor-not-allowed select-none"
                        }`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  );
}