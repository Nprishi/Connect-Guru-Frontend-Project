"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { useNotificationsQuery } from "@/hooks/useQueryHooks";

export function NotificationsCard() {
  const { data: notificationsData = [] } = useNotificationsQuery();
  const notifications = Array.isArray(notificationsData) ? notificationsData : [];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Latest notifications</CardTitle>
        <CardDescription>Alerts and reminders from the admin panel and platform events.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
            No notifications yet. New alerts will appear when there is activity on your account.
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                  <Bell className="h-4 w-4 text-blue-600" />
                  {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "Just now"}
                </div>
                {!notification.isRead ? (
                  <Badge variant="outline">New</Badge>
                ) : null}
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{notification.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{notification.detail}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
