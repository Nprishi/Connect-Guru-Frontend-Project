"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { RegisterPayload } from "@/types/auth";

import {
  User,
  Mail,
  Lock,
  Phone,
  Users,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  GraduationCap,
  UserCircle,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

import { AuthCard } from "@/components/common/AuthCard";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import type { Gender } from "@/types/user";
export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    phone: "",
    gender: "" as Gender,
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.gender) {
      setError("Please select your gender.");
      return;
    }

    try {
      const auth = await register({
        ...form,
        gender: form.gender,
      });

      setSuccess("Registration successful! Redirecting to login...");

      switch (auth.user.role) {
        case "teacher":
        case "student":
          setTimeout(() => {
            router.replace(ROUTES.login);
          }, 100);
          break;

        default:
          router.replace("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to register");
    }
  }

  const inputBaseStyles =
    "h-11 w-full rounded-[14px] border border-border bg-card px-4 text-[14px] text-body transition-all placeholder:text-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary outline-none shadow-none";

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Join thousands of learners and educators."

      badge="Connect Guru"

      heading="Where Learning Meets Opportunity."

      description="Whether you're looking to learn new skills or share your expertise, Connect Guru helps you connect, collaborate, and succeed."

      image="/Registration.png"

      features={[
        {
          icon: GraduationCap,
          text: "Study with Verified Teachers",
        },
        {
          icon: UserCircle,
          text: "Create Your Learning Profile",
        },
        {
          icon: CalendarCheck,
          text: "Book Sessions in Minutes",
        },
        {
          icon: TrendingUp,
          text: "Track Your Learning Progress",
        },
      ]}

      footerText="Already have an account?"
      footerHref={ROUTES.login}
      footerLabel="Sign in"
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="space-y-6 font-sans"
      >


        {/* Name */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <User className="h-4 w-4 text-primary" />
              First Name
            </label>

            <input
              value={form.firstName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              placeholder="John"
              required
              className={inputBaseStyles}
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <User className="h-4 w-4 text-primary" />
              Last Name
            </label>

            <input
              value={form.lastName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              placeholder="Doe"
              required
              className={inputBaseStyles}
            />
          </motion.div>
        </div>

        {/* Email */}
        <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail className="h-4 w-4 text-primary" />
            Email Address
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="john@example.com"
            required
            className={inputBaseStyles}
          />
        </motion.div>

        {/* Password */}
        <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Lock className="h-4 w-4 text-primary" />
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Create a secure password"
              required
              className={`${inputBaseStyles} pr-11`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-primary"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            Use at least 8 characters for better security.
          </div>
        </motion.div>

        {/* Role + Phone */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Sparkles className="h-4 w-4 text-primary" />
              Register As
            </label>

            <div className="relative">
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    role: e.target.value as "student" | "teacher",
                  }))
                }
                className={`${inputBaseStyles} appearance-none pr-10`}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>

              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="+977 98XXXXXXXX"
              className={inputBaseStyles}
            />
          </motion.div>
        </div>

        {/* Gender */}
        <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Users className="h-4 w-4 text-primary" />
            Gender
          </label>

          <div className="relative">
            <Select
              value={form.gender}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  gender: e.target.value as Gender,
                }))
              }
              className={`${inputBaseStyles} appearance-none pr-10`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>

            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </motion.div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm font-medium text-red-600">{error}</p>
          </motion.div>
        ) : success ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-green-200 bg-green-50 p-4"
          >
            <p className="text-sm font-medium text-green-700">
              {success}
            </p>
          </motion.div>
        ) : null}

        {/* Submit */}
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 15px 30px rgba(37,99,235,.25)",
          }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-white transition"
        >
          Create Account
        </motion.button>

        <p className="text-center text-xs text-slate-500">
          By creating an account, you agree to our{" "}
          <span className="font-medium text-primary cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-medium text-primary cursor-pointer">
            Privacy Policy
          </span>.
        </p>
      </motion.form>
    </AuthCard>
  );
}