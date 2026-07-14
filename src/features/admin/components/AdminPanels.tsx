import { Bell, CheckCircle2, Package, PlusCircle, Search, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { title: "Add Teacher", description: "Create a new instructor profile.", icon: PlusCircle },
  { title: "Add Category", description: "Group content into categories.", icon: Search },
  { title: "Approve Requests", description: "Review pending hires and matches.", icon: CheckCircle2 },
  { title: "Manage Packages", description: "Update current lesson bundles.", icon: Package },
  { title: "Send Notification", description: "Communicate with the platform community.", icon: Bell },
];

const notifications = [
  { title: "New student registered", detail: "Maya joined with a new premium package.", time: "2m ago" },
  { title: "Teacher approved", detail: "Jasmine Lee passed profile validation.", time: "40m ago" },
  { title: "Package created", detail: "A new SAT Prep package is now live.", time: "1h ago" },
  { title: "Payment received", detail: "Transaction TXN-9812 was successfully processed.", time: "3h ago" },
];

const timeline = [
  { title: "New student registered", detail: "Maya Singh joined as a student.", time: "Just now" },
  { title: "Teacher approved", detail: "Ethan Patel is now verified on the platform.", time: "1h ago" },
  { title: "Package created", detail: "A new premium tutoring bundle was published.", time: "3h ago" },
  { title: "Hire request completed", detail: "A request has been matched and marked complete.", time: "5h ago" },
  { title: "Payment received", detail: "The latest payment was captured successfully.", time: "7h ago" },
];

function ActionCard({ title, description, icon: Icon }: { title: string; description: string; icon: typeof PlusCircle }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-3xl bg-blue-50 text-blue-700">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Start
        </Button>
      </CardContent>
    </Card>
  );
}

export function AdminPanels() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => (
          <ActionCard key={action.title} title={action.title} description={action.description} icon={action.icon} />
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <p className="text-sm text-slate-500">Latest platform alerts for admin review.</p>
            </div>
            <Badge variant="outline">4 new</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {notifications.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            View all activity
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
