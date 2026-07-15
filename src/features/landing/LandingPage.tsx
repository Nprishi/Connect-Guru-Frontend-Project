"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  CalendarRange,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";

// --- PRESERVED HIGHLIGHTS DATA (Elevated with dynamic metadata for icons/colors) ---
const highlights = [
  {
    title: "Verified experts",
    description: "Browse tutors with strong profiles and ratings.",
    icon: ShieldCheck,
    iconColor: "text-[#10B981] bg-[#10B981]/10"
  },
  {
    title: "Flexible booking",
    description: "Schedule lessons around your availability.",
    icon: CalendarRange,
    iconColor: "text-[#4F46E5] bg-[#4F46E5]/10"
  },
  {
    title: "Simple payments",
    description: "Handle lesson packages and transactions smoothly.",
    icon: CreditCard,
    iconColor: "text-[#7C3AED] bg-[#7C3AED]/10"
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-12 py-4 max-w-7xl mx-auto font-sans">

      {/* Premium Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[24px] border border-border bg-gradient-to-br from-[#4F46E5] via-[#5A3EE4] to-[#7C3AED] p-8 md:p-14 text-white shadow-soft"
      >
        {/* Modern SaaS Grid Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

        {/* Soft Background Radial Light Glares */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#7C3AED]/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <Badge className="bg-white/15 text-white border-none px-3.5 py-1 text-[12px] font-semibold tracking-wider hover:bg-white/20 rounded-full backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 inline fill-white/10" />
            Connect Guru
          </Badge>

          <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight text-white leading-[1.15]">
            Find the right mentor and grow faster
          </h1>

          <p className="max-w-2xl text-[16px] md:text-[18px] text-white/90 font-medium leading-relaxed">
            Discover trusted teachers, book sessions, manage payments, and stay connected in one streamlined platform.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-[14px] bg-white px-6 text-[14px] font-semibold text-[#4F46E5] shadow-soft hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Get started
            </Link>
            <Link
              href="/teachers"
              className="inline-flex h-12 items-center justify-center rounded-[14px] border border-white/30 bg-white/10 backdrop-blur-sm px-6 text-[14px] font-semibold text-white hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Explore teachers
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Dynamic Highlights Section */}
      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card className="rounded-[24px] border-border bg-card p-6 shadow-soft hover:shadow-glow transition-all duration-300 h-full flex flex-col items-start justify-between">
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-xl ${item.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardHeader className="p-0 space-y-1.5">
                    <CardTitle className="text-[18px] font-bold text-heading tracking-tight">{item.title}</CardTitle>
                    <CardDescription className="text-[14px] text-body leading-relaxed">{item.description}</CardDescription>
                  </CardHeader>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </section>

      {/* Feature Grid Section */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Why Learners Stay Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="rounded-[24px] border border-border bg-card shadow-soft p-6 h-full flex flex-col justify-between">
            <div>
              <CardHeader className="p-0 pb-6 border-b border-border/60">
                <CardTitle className="text-[24px] font-bold text-heading tracking-tight">Why learners stay</CardTitle>
                <CardDescription className="text-[14px] text-muted">Everything you need to learn with confidence.</CardDescription>
              </CardHeader>

              <CardContent className="p-0 pt-6 space-y-3">
                {[
                  "Personalized tutor matching",
                  "Clear progress tracking",
                  "Fast scheduling and support"
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-[14px] border border-border bg-background p-4 hover:border-primary/20 hover:bg-card transition-all duration-200"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0" />
                    <span className="text-[14px] font-semibold text-heading">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Start Today Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card className="rounded-[24px] border border-border bg-card shadow-soft p-6 h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-[24px] font-bold text-heading tracking-tight">Start today</CardTitle>
                <CardDescription className="text-[14px] text-muted">Join thousands of learners building new skills.</CardDescription>
              </CardHeader>

              {/* Trust Metric Matrix */}
              <div className="py-5 border-y border-border/60 flex items-center gap-6">
                <div className="text-left">
                  <span className="text-[24px] font-bold text-[#7C3AED] leading-none block">15,000+</span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mt-1">Lessons Done</span>
                </div>
                <div className="h-8 w-[1px] bg-border" />
                <div className="text-left">
                  <span className="text-[24px] font-bold text-[#10B981] leading-none block">4.92 / 5</span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mt-1">Average Review</span>
                </div>
              </div>
            </div>

            <CardContent className="p-0 pt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-[14px] bg-[#4F46E5] hover:bg-[#4338CA] text-[14px] font-semibold text-white shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98] duration-200"
              >
                Create account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-[14px] border border-border bg-card text-[14px] font-semibold text-body shadow-soft hover:bg-background transition-all hover:scale-[1.02] active:scale-[0.98] duration-200"
              >
                View packages
              </Link>
            </CardContent>
          </Card>
        </motion.div>

      </section>
    </div>
  );
}