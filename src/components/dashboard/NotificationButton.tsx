/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationsQuery } from "@/hooks/useQueryHooks";

export function NotificationButton() {
  const user = useAuthStore((state) => state.user);

  const {
    data: notificationsData = [],
    isLoading,
  } = useNotificationsQuery();

  const notifications = Array.isArray(notificationsData)
    ? notificationsData
    : [];

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const notificationsRoute =
    user?.role === "teacher"
      ? "/teacher/notifications"
      : user?.role === "student"
        ? "/student/notifications"
        : "/admin/notifications";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            transition-all
            hover:bg-slate-50
            hover:shadow-md
          "
        >
          <Bell className="h-5 w-5 text-slate-700" />

          {unreadCount > 0 && (
            <Badge
              className="
                absolute
                -right-1
                -top-1
                h-5
                min-w-20px
                rounded-full
                bg-indigo-600
                px-1
                text-[10px]
                text-white
                ring-2
                ring-white
              "
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 rounded-3xl p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">
              Notifications
            </h3>

            <Badge variant="secondary">
              {unreadCount} New
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[420px] overflow-y-auto">
          {isLoading && (
            <div className="space-y-3 p-4">
              <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
            </div>
          )}

          {!isLoading && notifications.length === 0 && (
            <div className="py-12 text-center">
              <Bell className="mx-auto mb-3 h-10 w-10 text-slate-300" />
              <p className="font-medium text-slate-700">
                No notifications
              </p>
              <p className="text-sm text-slate-500">
                You are all caught up.
              </p>
            </div>
          )}

          {!isLoading &&
            notifications.slice(0, 5).map((notification: any) => (
              <div
                key={notification.id}
                className="
                  flex
                  gap-3
                  border-b
                  px-5
                  py-4
                  transition-colors
                  hover:bg-slate-50
                "
              >
                <div
                  className={`
                    mt-2
                    h-2.5
                    w-2.5
                    rounded-full
                    ${notification.isRead
                      ? "bg-slate-300"
                      : "bg-indigo-600"
                    }
                  `}
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {notification.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {notification.message}
                  </p>

                  <span className="mt-2 block text-[11px] text-slate-400">
                    {notification.createdAt
                      ? new Date(
                        notification.createdAt
                      ).toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="border-t p-3">
          <Button

            className="h-11 w-full rounded-xl"
          >
            <Link href={notificationsRoute}>
              View All Notifications
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}