"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button className="w-full" type="submit">Login</Button>
      </form>
    </AuthCard>
  );
}
