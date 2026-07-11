"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Search,
  Settings,
  LogOut,
  User,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopNavbarProps {
  title: string;
  subtitle: string;
}

export function TopNavbar({ title, subtitle }: TopNavbarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-600">{subtitle}</p>
          <h1 className="truncate text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
        </div>

        <div className="hidden flex-1 items-center gap-3 lg:flex">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" placeholder="Search teachers, requests or sessions" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
            <Bell className="h-5 w-5" />
            <Badge className="absolute right-1 top-1 rounded-full bg-blue-600 px-1.5 py-[2px] text-[10px] font-semibold text-white">4</Badge>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
                <Avatar className="h-9 w-9 rounded-full bg-blue-600 text-white">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Jane Doe</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link href="/profile" className="flex items-center gap-2 w-full">
                  <User className="h-4 w-4 text-slate-500" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center gap-2 w-full">
                  <Settings className="h-4 w-4 text-slate-500" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/messages" className="flex items-center gap-2 w-full">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  Messages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/logout" className="flex items-center gap-2 w-full text-destructive">
                  <LogOut className="h-4 w-4 text-slate-500" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
