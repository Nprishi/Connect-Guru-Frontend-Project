import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2 } from "lucide-react";

const notifications = [
  { title: "Teacher reply received", detail: "Maya sent a message about your Friday class.", time: "2h ago" },
  { title: "Package renewed", detail: "Your Bronze Bundle renewed successfully.", time: "1d ago" },
  { title: "Session reminder", detail: "Upcoming tutoring session in 3 hours.", time: "4h ago" },
];

export function NotificationsCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Latest notifications</CardTitle>
        <CardDescription>Alerts and reminders for your next actions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {notifications.map((notification) => (
          <div key={notification.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                <Bell className="h-4 w-4 text-blue-600" />
                {notification.time}
              </div>
              <Badge variant="outline">New</Badge>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{notification.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{notification.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
