"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Gift,
    MessageSquare,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface TeacherHeroProps {
    greetingName: string;
    packageCount: number;
}

export function TeacherHero({
    greetingName,
    packageCount,
}: TeacherHeroProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900"
        >
            {/* Decorative Background */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative grid gap-10 p-8 lg:grid-cols-[1.5fr_0.8fr] lg:p-10 xl:p-12">
                {/* Left Side */}
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                        <Sparkles className="h-4 w-4 text-yellow-300" />
                        Welcome Back
                    </div>

                    <h1 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
                        Hello, {greetingName} 👋
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                        Manage your teaching packages, review student requests, organize
                        upcoming classes, and grow your teaching business with Connect Guru.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100"
                        >
                            Manage Packages
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            size="lg"
                            variant="secondary"
                            className="rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                        >
                            Review Requests
                        </Button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center">
                    <div className="grid w-full gap-4">
                        <GlassCard
                            icon={<Gift className="h-6 w-6 text-violet-600" />}
                            title="Teaching Packages"
                            value={packageCount.toString()}
                            subtitle="Available Packages"
                        />

                        <GlassCard
                            icon={<BookOpen className="h-6 w-6 text-blue-600" />}
                            title="Today's Goal"
                            value="Stay Active"
                            subtitle="Review and manage sessions"
                        />

                        <GlassCard
                            icon={<MessageSquare className="h-6 w-6 text-emerald-600" />}
                            title="Student Requests"
                            value="Pending"
                            subtitle="Check your latest requests"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

interface GlassCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle: string;
}

function GlassCard({
    icon,
    title,
    value,
    subtitle,
}: GlassCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
        >
            <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-white p-3">
                    {icon}
                </div>

                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Live
                </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-200">
                {title}
            </p>

            <h3 className="mt-1 text-3xl font-bold text-white">
                {value}
            </h3>

            <p className="mt-2 text-sm text-slate-300">
                {subtitle}
            </p>
        </motion.div>
    );
}