import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  { title: "Verified experts", description: "Browse tutors with strong profiles and ratings." },
  { title: "Flexible booking", description: "Schedule lessons around your availability." },
  { title: "Simple payments", description: "Handle lesson packages and transactions smoothly." },
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-sm">
        <Badge className="bg-white/15 text-blue-50 hover:bg-white/20">Connect Guru</Badge>
        <h1 className="mt-3 text-4xl font-semibold">Find the right mentor and grow faster</h1>
        <p className="mt-4 max-w-2xl text-blue-50">
          Discover trusted teachers, book sessions, manage payments, and stay connected in one streamlined platform.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/register" className="inline-flex rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-slate-100">
            Get started
          </Link>
          <Link href="/teachers" className="inline-flex rounded-2xl border border-white/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
            Explore teachers
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} className="shadow-sm">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Why learners stay</CardTitle>
            <CardDescription>Everything you need to learn with confidence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <div className="rounded-xl border border-slate-200 p-3">Personalized tutor matching</div>
            <div className="rounded-xl border border-slate-200 p-3">Clear progress tracking</div>
            <div className="rounded-xl border border-slate-200 p-3">Fast scheduling and support</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Start today</CardTitle>
            <CardDescription>Join thousands of learners building new skills.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href="/register" className="inline-flex rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              Create account
            </Link>
            <Link href="/packages" className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              View packages
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
