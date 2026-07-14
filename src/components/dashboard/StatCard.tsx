"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps extends ComponentPropsWithoutRef<typeof Card> {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  accent: "blue" | "teal" | "violet" | "indigo";
}

const accentStyles = {
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-600",
    border: "border-blue-100",
    glow: "bg-blue-500/20",
  },
  teal: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-600",
    border: "border-emerald-100",
    glow: "bg-emerald-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    icon: "text-violet-600",
    border: "border-violet-100",
    glow: "bg-violet-500/20",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    icon: "text-indigo-600",
    border: "border-indigo-100",
    glow: "bg-indigo-500/20",
  },
} as const;

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
  className,
  ...props
}: StatCardProps) {
  const style = accentStyles[accent];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl",
          style.border,
          className
        )}
        {...props}
      >
        {/* Decorative Glow */}
        <div
          className={cn(
            "absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl opacity-50 transition-opacity duration-300 group-hover:opacity-100",
            style.glow
          )}
        />

        <CardContent className="relative p-6">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl",
                style.bg
              )}
            >
              <Icon className={cn("h-7 w-7", style.icon)} />
            </div>

            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" />
              Live
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              {value}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className={cn(
                "h-full rounded-full",
                accent === "blue" && "bg-blue-500",
                accent === "teal" && "bg-emerald-500",
                accent === "violet" && "bg-violet-500",
                accent === "indigo" && "bg-indigo-500"
              )}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}