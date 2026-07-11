import { type ComponentPropsWithoutRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps extends ComponentPropsWithoutRef<typeof Card> {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  accent: "blue" | "teal" | "violet" | "indigo";
}

const accentStyles: Record<StatCardProps["accent"], string> = {
  blue: "bg-blue-500 text-white",
  teal: "bg-teal-500 text-white",
  violet: "bg-violet-500 text-white",
  indigo: "bg-indigo-500 text-white",
};

export function StatCard({ title, value, description, icon: Icon, accent, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("shadow-sm", className)} {...props}>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <div className={cn("grid h-12 w-12 place-items-center rounded-3xl shadow-sm", accentStyles[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
