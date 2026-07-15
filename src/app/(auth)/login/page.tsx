"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { AuthCard } from "@/components/common/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const auth = await login(form);
      const role = auth?.user?.role;
      if (role === "teacher") {
        router.replace(ROUTES.dashboard.teacher);
      } else {
        router.replace(ROUTES.dashboard.student);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login");
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to access your student or teacher workspace."
      footerText="New here?"
      footerHref={ROUTES.register}
      footerLabel="Create an account"
    >
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="space-y-5 text-left font-sans"
      >
        {/* Email Input Field */}
        <div className="space-y-1.5">
          <label className="text-[14px] font-semibold text-heading flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted" />
            <span>Email Address</span>
          </label>
          <div className="relative">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com"
              required
              className="h-11 w-full rounded-[14px] border border-border bg-card px-4 text-[14px] text-body transition-all placeholder:text-muted focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:outline-none outline-none shadow-none"
            />
          </div>
        </div>

        {/* Password Input Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[14px] font-semibold text-heading flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted" />
              <span>Password</span>
            </label>
            <a
              href="#forgot-password"
              className="text-[12px] font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              required
              className="h-11 w-full rounded-[14px] border border-border bg-card pl-4 pr-11 text-[14px] text-body transition-all placeholder:text-muted focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:outline-none outline-none shadow-none"
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

        {/* Dynamic Error Status Banner */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[14px] bg-danger/5 border border-danger/20 p-3.5"
          >
            <p className="text-[14px] font-semibold text-danger">{error}</p>
          </motion.div>
        ) : null}

        {/* Form Submission Action */}
        <motion.div
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="pt-2"
        >
          <Button
            className="h-12 w-full rounded-[14px] bg-primary hover:bg-primary-hover text-[16px] font-semibold text-white shadow-soft transition-all duration-200 gap-2"
            type="submit"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.form>
    </AuthCard>
  );
}