"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { Searchbar } from "./Searchbar";

import { NotificationButton } from "./NotificationButton";
import { ProfileDropdown } from "./ProfileDropdown";
import { MobileNavbar } from "./MobileNavbar";
// import { QuickActions } from "./QuickActions";

interface TopNavbarProps {
  title: string;
  subtitle: string;
}

export function TopNavbar({
  title,
  subtitle,
}: TopNavbarProps) {

  const [scrolled, setScrolled] =
    useState(false);


  // Navbar glass effect on scroll
  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  return (

    <motion.header

      initial={{
        y: -20,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.35,
      }}

      className="
        sticky
        h-20
        top-0
        z-50
        w-full
      "

    >


      {/* Background Glass */}

      <div
        className={`
          absolute
          inset-0
          border-b
          transition-all
          duration-300

          ${scrolled
            ?
            "bg-white/90 backdrop-blur-xl border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,.06)]"
            :
            "bg-white/70 backdrop-blur-lg border-white/40"
          }
        `}
      />


      {/* Bottom Gradient Line */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          bg-linear-to-r
          from-transparent
          via-slate-300
          to-transparent
        "
      />



      <div
        className="
          relative
          mx-auto
          flex
          h-16
          max-w-[1600px]
          items-center
          justify-between
          gap-4
          px-4

          md:px-8

          lg:h-18
        "
      >



        {/* LEFT HEADER */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
          "
        >

          <div
            className="
              space-y-1
            "
          >


            {/* Subtitle */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-indigo-500
                "
              />


              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-indigo-600
                "
              >
                {subtitle}
              </span>

            </div>




            {/* Title */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <h1
                className="
                  truncate
                  text-xl
                  font-bold
                  tracking-tight
                  text-slate-900

                  lg:text-2xl
                "
              >
                {/* {title} */}
              </h1>



              <div
                className="
                  hidden
                  items-center
                  gap-2
                  text-sm
                  text-slate-500

                  xl:flex
                "
              >

                <CalendarDays
                  className="
                    h-4
                    w-4
                  "
                />

                <span>
                  Dashboard
                </span>

              </div>


            </div>


          </div>


        </div>





        {/* SEARCH */}

        <div
          className="
            hidden
            flex-1
            justify-center

            xl:flex
          "
        >

          <Searchbar title={title} subtitle={subtitle} />

        </div>





        {/* ACTIONS */}

        <div
          className="
            flex
            flex-1
            items-center
            justify-end
            gap-3
          "
        >


          {/* Future CTA */}
          {/* <QuickActions /> */}



          <NotificationButton />


          <ProfileDropdown />


          <MobileNavbar />


        </div>


      </div>


    </motion.header>

  );
}