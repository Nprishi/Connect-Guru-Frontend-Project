import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Join today</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create your account</h1>
      <p className="mt-2 text-slate-600">Choose your role and start exploring verified tutors and packages.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {[
          { title: "Student", description: "Book lessons and save teachers" },
          { title: "Teacher", description: "Showcase your expertise" },
          { title: "Admin", description: "Moderate the platform" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
            <h2 className="font-medium text-slate-900">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Get started</Link>
      </div>
    </div>
  );
}
