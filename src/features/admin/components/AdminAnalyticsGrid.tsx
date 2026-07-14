import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const analytics = [
  {
    title: "Student Growth",
    value: "+23.4%",
    description: "New student activations are trending higher this quarter.",
    icon: TrendingUp,
    progress: 72,
  },
  {
    title: "Teacher Growth",
    value: "+18.1%",
    description: "Teacher onboarding remains strong across core categories.",
    icon: BarChart3,
    progress: 61,
  },
  {
    title: "Revenue Overview",
    value: "$324.7k",
    description: "Revenue performance is ahead of expectations for the month.",
    icon: LineChart,
    progress: 82,
  },
  {
    title: "Session Statistics",
    value: "4.9k",
    description: "Session volume is up after the latest campaign launch.",
    icon: PieChart,
    progress: 68,
  },
];

export function AdminAnalyticsGrid() {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {analytics.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="shadow-sm">
            <CardHeader className="px-6 pb-0 pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-3xl bg-slate-100 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
                <Badge variant="secondary">+{item.progress}%</Badge>
              </div>
              <div className="space-y-3">
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${item.progress}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  <span>Low</span>
                  <span>Avg</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
