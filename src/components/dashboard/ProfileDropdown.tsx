"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ChevronDown,
    LogOut,
    MessageSquare,
    Settings,
    User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthStore } from "@/store/useAuthStore";

export function ProfileDropdown() {
    const user = useAuthStore((state) => state.user);

    const displayName = user
        ? `${user.firstName} ${user.lastName}`
        : "Guest";

    const initials = user
        ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
        : "G";

    const role = user?.role ?? "Guest";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            shadow-sm
            transition-all
            hover:bg-slate-50
            hover:shadow-md
          "
                >
                    <div className="relative">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-indigo-600 font-semibold text-white">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        {/* Online Indicator */}
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                    </div>

                    <div className="hidden text-left lg:block">
                        <p className="text-sm font-semibold text-slate-900">
                            {displayName}
                        </p>

                        <p className="text-xs text-slate-500 capitalize">
                            {role}
                        </p>
                    </div>

                    <ChevronDown className="h-4 w-4 text-slate-500" />
                </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-72 rounded-3xl p-2"
            >
                {/* User Info */}
                <div className="flex items-center gap-3 rounded-2xl p-3">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-indigo-600 text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">
                            {displayName}
                        </h4>

                        <Badge className="mt-1 capitalize">
                            {role}
                        </Badge>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem >
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-xl py-2"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem >
                    <Link
                        href="/messages"
                        className="flex items-center gap-3 rounded-xl py-2"
                    >
                        <MessageSquare className="h-4 w-4" />
                        Messages
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem >
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-xl py-2"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem

                    className="text-red-600 focus:text-red-600"
                >
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 rounded-xl py-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}