import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CalendarDays, CheckCircle2, ChevronRight } from "lucide-react";

interface OverviewCardProps {
  title: string;
  description: string;
  actionLabel: string;
}

export function OverviewCard({ title, description, actionLabel }: OverviewCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Upcoming sessions</p>
              <p className="text-sm text-slate-500">Keep your day on track with the next lessons.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Confirmed bookings</p>
              <p className="text-sm text-slate-500">Everything is ready for the next learning session.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-slate-950 p-6 text-white">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Today</p>
            <p className="mt-4 text-4xl font-semibold">5 sessions</p>
            <p className="mt-2 text-sm text-slate-300">Best day for focus and consistent progress.</p>
          </div>
          <Button variant="secondary" className="mt-4 inline-flex items-center gap-2 justify-center bg-white text-slate-950 hover:bg-slate-100">
            {actionLabel}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
