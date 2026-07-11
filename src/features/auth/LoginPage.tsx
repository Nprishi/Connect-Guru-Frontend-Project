import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Welcome back</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to Connect Guru</h1>
      <p className="mt-2 text-slate-600">Access your dashboard, bookings, and messages in one place.</p>
      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-900">Email</p>
          <p className="mt-1 text-sm text-slate-600">student@example.com</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-900">Password</p>
          <p className="mt-1 text-sm text-slate-600">Use your registered password</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/student" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Continue</Link>
        <Link href="/register" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Create account</Link>
      </div>
    </div>
  );
}
