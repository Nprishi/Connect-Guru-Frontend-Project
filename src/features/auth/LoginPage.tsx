"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  MessageCircle,
  CreditCard,
} from "lucide-react";

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
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    setSuccess("Login successful! Redirecting to Dashboard...");

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
      title="Welcome Back"
      subtitle="Sign in to continue your learning journey."
      badge="Connect Guru"
      heading="Continue Your Learning Journey"
      description="Access your dashboard, connect with verified teachers and continue learning from anywhere."
      image="/Login.png"
      features={[
        {
          icon: ShieldCheck,
          text: "Verified Teachers",
        },
        {
          icon: CalendarCheck,
          text: "Book Sessions",
        },
        {
          icon: MessageCircle,
          text: "Real-time Chat",
        },
        {
          icon: CreditCard,
          text: "Secure Payments",
        },
      ]}
      footerText="New here?"
      footerHref={ROUTES.register}
      footerLabel="Create an account"
    >
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail className="h-4 w-4 text-blue-600" />
            Email Address
          </label>

          <div className="relative group">
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Enter your email"
              required
              className="
          h-12
          rounded-xl
          border-slate-300
          bg-white
          shadow-sm
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          group-hover:border-slate-400
        "
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Lock className="h-4 w-4 text-blue-600" />
              Password
            </label>

            <button
              type="button"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative group">
            <Input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Enter your password"
              required
              className="
          h-12
          rounded-xl
          border-slate-300
          bg-white
          pr-12
          shadow-sm
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          group-hover:border-slate-400
        "
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {error ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
        rounded-xl
        border
        border-red-200
        bg-red-50
        px-4
        py-3
      "
          >
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
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

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Button
              type="submit"
              className="
          group
          h-12
          w-full
          rounded-xl
          bg-blue-600
          text-white
          text-base
          font-semibold
          shadow-lg
          shadow-blue-200
          transition-all
          duration-300
          hover:bg-blue-700
          hover:shadow-xl
          hover:shadow-blue-300
        "
            >
              <span>Sign In</span>

              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </AuthCard>
  );
}