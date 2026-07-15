"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  Users,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

import { AuthCard } from "@/components/common/AuthCard";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student" as "student" | "teacher",
    phone: "",
    gender: "",
  });
  const [error, setError] = useState("");


  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const auth = await register(form);
      const role = auth?.user?.role;
      if (role === "teacher") {
        router.replace(ROUTES.dashboard.teacher);
      } else {
        router.replace(ROUTES.dashboard.student);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to register");
    }
  }

  const inputBaseStyles =
    "h-11 w-full rounded-[14px] border border-border bg-card px-4 text-[14px] text-body transition-all placeholder:text-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary outline-none shadow-none";

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join Connect Guru as a student, teacher, or admin."
      footerText="Already have an account?"
      footerHref={ROUTES.login}
      footerLabel="Sign in"
    >
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-4 font-sans text-left"
      >
        {/* Row 1: Name Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
              <User className="h-4 w-4 text-muted" />
              <span>First name</span>
            </label>
            <input
              value={form.firstName}
              onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
              className={inputBaseStyles}
              placeholder="e.g. John"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
              <User className="h-4 w-4 text-muted" />
              <span>Last name</span>
            </label>
            <input
              value={form.lastName}
              onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
              className={inputBaseStyles}
              placeholder="e.g. Doe"
              required
            />
          </div>
        </div>

        {/* Row 2: Email Field */}
        <div className="space-y-1.5">
          <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-muted" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className={inputBaseStyles}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Row 3: Password Field with Custom Visibility Toggle */}
        <div className="space-y-1.5">
          <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-muted" />
            <span>Password</span>
          </label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className={`${inputBaseStyles} pr-11`}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-body transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Row 4: Role & Phone Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-muted" />
              <span>Role</span>
            </label>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as "student" | "teacher" }))}
                className={`${inputBaseStyles} appearance-none pr-10`}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-muted" />
              <span>Phone</span>
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className={inputBaseStyles}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        {/* Row 5: Custom Gender Select Field Wrapper */}
        <div className="space-y-1.5">
          <label className="text-[14px] font-semibold text-heading flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted" />
            <span>Gender</span>
          </label>
          <div className="relative">
            <Select
              value={form.gender}
              onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}
              className={`${inputBaseStyles} appearance-none pr-10`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {/* Error Notification Block */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[14px] bg-danger/5 border border-danger/20 p-3"
          >
            <p className="text-sm font-semibold text-danger">{error}</p>
          </motion.div>
        ) : null}

        {/* Action Button */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full h-12 rounded-[14px] bg-primary hover:bg-primary-hover text-[16px] font-semibold text-white shadow-soft transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20"
        >
          Register
        </motion.button>
      </motion.form>
    </AuthCard>
  );
}