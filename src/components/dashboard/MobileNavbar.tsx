"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Menu,
    User,
    Bell,
    MessageSquare,
    Settings,
    LogOut,
    LayoutDashboard,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuthStore } from "@/store/useAuthStore";


export function MobileNavbar() {

    const user = useAuthStore(
        (state) => state.user
    );


    const displayName = user
        ? `${user.firstName} ${user.lastName}`
        : "Guest";


    const initials = user
        ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
        : "G";


    const role = user?.role ?? "student";


    const navigation = {

        teacher: [
            {
                label: "Dashboard",
                href: "/teacher/dashboard",
                icon: LayoutDashboard,
            },
            {
                label: "Students",
                href: "/teacher/students",
                icon: User,
            },
            {
                label: "Notifications",
                href: "/teacher/notifications",
                icon: Bell,
            },
            {
                label: "Messages",
                href: "/messages",
                icon: MessageSquare,
            },
        ],


        student: [
            {
                label: "Dashboard",
                href: "/student/dashboard",
                icon: LayoutDashboard,
            },
            {
                label: "Find Teachers",
                href: "/teachers",
                icon: User,
            },
            {
                label: "Notifications",
                href: "/student/notifications",
                icon: Bell,
            },
            {
                label: "Messages",
                href: "/messages",
                icon: MessageSquare,
            },
        ],


        admin: [
            {
                label: "Dashboard",
                href: "/admin/dashboard",
                icon: LayoutDashboard,
            },
            {
                label: "Users",
                href: "/admin/users",
                icon: User,
            },
            {
                label: "Notifications",
                href: "/admin/notifications",
                icon: Bell,
            },
            {
                label: "Messages",
                href: "/messages",
                icon: MessageSquare,
            },
        ],

    };


    const menuItems =
        navigation[
        role as keyof typeof navigation
        ] ?? navigation.student;



    return (

        <div className="flex xl:hidden">

            <Sheet>

                <SheetTrigger >

                    <motion.div

                        whileTap={{
                            scale: 0.95,
                        }}

                        className="
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
            "

                    >

                        <Menu
                            className="
                h-5
                w-5
                text-slate-700
              "
                        />

                    </motion.div>

                </SheetTrigger>



                <SheetContent

                    side="left"

                    className="
            w-[320px]
            border-r
            border-slate-200
            bg-white
            p-0
          "

                >


                    {/* USER PROFILE */}

                    <div
                        className="
              border-b
              border-slate-200
              p-6
            "
                    >

                        <div
                            className="
                flex
                items-center
                gap-3
              "
                        >

                            <Avatar
                                className="
                  h-12
                  w-12
                "
                            >

                                <AvatarFallback
                                    className="
                    bg-indigo-600
                    text-white
                  "
                                >
                                    {initials}
                                </AvatarFallback>

                            </Avatar>


                            <div>

                                <h3
                                    className="
                    font-semibold
                    text-slate-900
                  "
                                >
                                    {displayName}
                                </h3>


                                <p
                                    className="
                    text-sm
                    capitalize
                    text-slate-500
                  "
                                >
                                    {role}
                                </p>

                            </div>


                        </div>

                    </div>



                    {/* MENU */}

                    <nav
                        className="
              space-y-1
              p-4
            "
                    >

                        {
                            menuItems.map(
                                (item) => {

                                    const Icon =
                                        item.icon;


                                    return (

                                        <Link
                                            key={item.href}
                                            href={item.href}
                                        >

                                            <motion.div

                                                whileHover={{
                                                    x: 5,
                                                }}

                                                className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-slate-700
                          transition
                          hover:bg-indigo-50
                          hover:text-indigo-600
                        "

                                            >

                                                <Icon
                                                    className="
                            h-5
                            w-5
                          "
                                                />


                                                {item.label}


                                            </motion.div>


                                        </Link>

                                    );

                                }
                            )
                        }


                    </nav>



                    {/* FOOTER */}

                    <div
                        className="
              absolute
              bottom-0
              w-full
              border-t
              border-slate-200
              p-4
            "
                    >


                        <Link
                            href="/settings"
                            className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                text-slate-700
                hover:bg-slate-50
              "
                        >

                            <Settings
                                className="
                  h-5
                  w-5
                "
                            />

                            Settings

                        </Link>



                        <Link
                            href="/logout"
                            className="
                mt-1
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                text-red-600
                hover:bg-red-50
              "
                        >

                            <LogOut
                                className="
                  h-5
                  w-5
                "
                            />

                            Logout

                        </Link>


                    </div>



                </SheetContent>


            </Sheet>


        </div>

    );

}