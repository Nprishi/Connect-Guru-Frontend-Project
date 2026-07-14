import { Bell, ChevronDown, MessageSquare, Moon, Search, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const menuItems = [
  { label: "My Profile", href: "/profile" },
  { label: "Account Settings", href: "/settings" },
  { label: "Change Password", href: "/settings/password" },
];

export function AdminDashboardHeader() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">Super Admin</Badge>
            <Badge className="bg-blue-100 text-blue-700">Platform Summary</Badge>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">Connect Guru</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Super Admin Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Monitor platform growth, operations, and quality metrics in one polished admin console.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search students, teachers, packages..." className="pl-10" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </Button>
            <Button variant="outline" className="gap-2">
              <Sun className="h-4 w-4" />
              <Moon className="hidden h-4 w-4" />
              Theme
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Active users</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">1.8k</p>
            <p className="mt-1 text-sm text-slate-500">+9.5% this month</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">New signups</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">324</p>
            <p className="mt-1 text-sm text-slate-500">+7.2% vs last week</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Revenue</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$72.4k</p>
            <p className="mt-1 text-sm text-slate-500">Monthly target 84%</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Requests</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">48</p>
            <p className="mt-1 text-sm text-slate-500">Pending approval</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center gap-3 rounded-full px-4 py-3">
            <div className="inline-flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-full bg-blue-600 text-white">
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">Sage Gardner</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.label}>
                <a href={item.href} className="block w-full text-left">
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/logout" className="block w-full text-left">
                Logout
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
