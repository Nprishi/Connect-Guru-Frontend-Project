import { ArrowUpRight, CreditCard, LayoutDashboard, Package, Users, UserPlus, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Students", value: "12.4k", detail: "+18% this month", icon: Users, accent: "bg-blue-100 text-blue-700" },
  { title: "Total Teachers", value: "1.2k", detail: "+12% active", icon: UserPlus, accent: "bg-sky-100 text-sky-700" },
  { title: "Active Teachers", value: "948", detail: "83% engaged", icon: CheckCircle2, accent: "bg-emerald-100 text-emerald-700" },
  { title: "Total Packages", value: "3.8k", detail: "+22% adoption", icon: Package, accent: "bg-violet-100 text-violet-700" },
  { title: "Pending Hire Requests", value: "58", detail: "Action required", icon: LayoutDashboard, accent: "bg-amber-100 text-amber-700" },
  { title: "Completed Sessions", value: "9.4k", detail: "+14% delivered", icon: CheckCircle2, accent: "bg-cyan-100 text-cyan-700" },
  { title: "Monthly Revenue", value: "$124.8k", detail: "+24% growth", icon: CreditCard, accent: "bg-emerald-100 text-emerald-700" },
  { title: "Platform Growth", value: "+32%", detail: "Year over year", icon: TrendingUp, accent: "bg-blue-100 text-blue-700" },
];

export function AdminStatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{item.title}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
                </div>
                <div className={`grid h-12 w-12 place-items-center rounded-3xl ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
                <span>{item.detail}</span>
                <Badge variant="outline" className="border-slate-200 text-slate-700">
                  <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                  Live
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
