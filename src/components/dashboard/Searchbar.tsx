/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Command,
    Sparkles,
    CalendarDays,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";

interface SearchbarProps {
    title: string;
    subtitle: string;
}

export function Searchbar({
    title,
    subtitle,
}: SearchbarProps) {

    // EXISTING AUTH STORE


    const user = useAuthStore((state) => state.user);


    // SCROLL EFFECT


    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);


    // DATE

    // const today = useMemo(() => {
    //     return new Intl.DateTimeFormat("en-US", {
    //         weekday: "long",
    //         month: "long",
    //         day: "numeric",
    //     }).format(new Date());
    // }, []);

    // USER

    const firstName =
        user?.firstName ?? "Guest";

    return (
        <motion.header
            initial={{
                y: -40,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.4,
            }}
            className={[
                "sticky top-0 z-50",
                "transition-all duration-300",
                isScrolled
                    ? "backdrop-blur-2xl"
                    : "backdrop-blur-xl",
            ].join(" ")}
        >

            {/* GLASS BACKGROUND */}


            <div
                className={[
                    "absolute inset-0",
                    "border-b",
                    "transition-all duration-300",
                    isScrolled
                        ? "bg-white/85 border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,.05)]"
                        : "bg-white/65 border-white/40",
                ].join(" ")}
            />

            {/* subtle gradient overlay */}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.4),rgba(255,255,255,0.1),rgba(255,255,255,0.4))]" />

            {/* bottom gradient line */}

            <div className="absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(226,232,240,1),transparent)]" />


            {/* CONTAINER */}


            <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8 lg:h-72px lg:px-10">

                {/* SEARCH */}


                <div className="hidden flex-full justify-center xl:flex">

                    <motion.div
                        whileHover={{
                            y: -2,
                        }}
                        className="group relative w-full max-w-2xl"
                    >

                        <Search
                            className="
              absolute
              left-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-slate-400
              transition-all
              duration-300
              group-focus-within:scale-110
              group-focus-within:text-indigo-600
              "
                        />

                        <Input
                            placeholder="Search teachers"
                            className="
              h-12
              rounded-2xl
              border-slate-200
              bg-slate-50/80
              pl-12
              pr-16
              text-[15px]
              shadow-sm
              transition-all
              duration-300
              placeholder:text-slate-400
              hover:bg-white
              hover:shadow-md
              focus-visible:border-indigo-500
              focus-visible:bg-white
              focus-visible:ring-4
              focus-visible:ring-indigo-500/10
              "
                        />

                    </motion.div>

                </div>


                <div className="flex flex-1 justify-end items-center gap-3">

                    {/* Mobile Search */}

                    <button
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
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-slate-50
            hover:shadow-md
            xl:hidden
            "
                    >
                        <Search className="h-5 w-5 text-slate-600" />
                    </button>


                </div>

            </div>
        </motion.header>
    );
}
