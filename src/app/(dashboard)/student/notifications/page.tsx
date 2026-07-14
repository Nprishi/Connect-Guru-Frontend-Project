import { NotificationsCard } from "@/components/dashboard/NotificationsCard";

export default function StudentNotificationsPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
        <p className="mt-2 text-slate-600">View the latest admin and event notifications for your student account.</p>
      </div>
      <NotificationsCard />
    </div>
  );
}
