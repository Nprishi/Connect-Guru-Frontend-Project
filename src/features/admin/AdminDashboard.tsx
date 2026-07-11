import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Teachers", value: "128", detail: "+12 this month" },
  { title: "Students", value: "1.2k", detail: "+8% active" },
  { title: "Open Issues", value: "14", detail: "5 urgent" },
];

const activity = [
  { title: "New teacher approvals", value: "3 pending" },
  { title: "Support tickets", value: "7 new" },
  { title: "Content reports", value: "2 flagged" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Admin Panel</p>
              <CardTitle className="mt-2 text-2xl">Platform overview</CardTitle>
              <CardDescription>Monitor growth, moderation, and support activity in one place.</CardDescription>
            </div>
            <Badge variant="secondary">Live</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.title} className="shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600">{item.title}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Latest moderation and engagement updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            {activity.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span>{item.title}</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Keep operations moving smoothly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <div className="rounded-xl border border-slate-200 p-3">Review new teacher applications</div>
            <div className="rounded-xl border border-slate-200 p-3">Respond to support tickets</div>
            <div className="rounded-xl border border-slate-200 p-3">Publish platform updates</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
