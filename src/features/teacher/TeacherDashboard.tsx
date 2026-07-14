"use client";

import {
  CreditCard,
  Gift,
  MessageCircle,
  Users,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { useMemo } from "react";

import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { TopNavbar } from "@/components/dashboard/TopNavbar";

import {
  useTeacherPackagesQuery,
  useTeacherOverviewQuery,
} from "@/hooks/useQueryHooks";

import { useAuthStore } from "@/store/useAuthStore";

import { TeacherHero } from "./TeacherHero";


export default function TeacherDashboard() {

  const user = useAuthStore(
    (state) => state.user
  );


  const teacherId = user?.id;


  // MongoDB data fetch
  const {
    data: teacherPackages = [],
  } = useTeacherPackagesQuery(
    teacherId
  );


  // MongoDB dashboard overview data
  const {
    data: overview,
    isLoading,
  } = useTeacherOverviewQuery(
    teacherId
  );



  const stats = useMemo(
    () => [

      {
        title: "Total Students",
        value:
          `${overview?.totalStudents ?? 0}`,
        description:
          "Active learners",
        icon: Users,
        accent: "blue" as const,
      },


      {
        title: "My Packages",
        value:
          `${teacherPackages.length}`,
        description:
          "Teaching bundles",
        icon: Gift,
        accent: "teal" as const,
      },


      {
        title: "Pending Requests",
        value:
          `${overview?.pendingRequests ?? 0}`,
        description:
          "New student requests",
        icon: MessageCircle,
        accent: "violet" as const,
      },


      {
        title: "Monthly Earnings",
        value:
          `$${overview?.monthlyEarnings ?? 0}`,
        description:
          "This month",
        icon: CreditCard,
        accent: "indigo" as const,
      },

    ],

    [
      overview,
      teacherPackages.length
    ]
  );



  const overviewItems = [
    {
      title: "Upcoming Sessions",

      value:
        overview?.upcomingSessions ?? 0,

      description:
        "Scheduled classes",

      icon:
        CalendarDays,

      color:
        "bg-indigo-50 text-indigo-600",
    },


    {
      title: "Confirmed Bookings",

      value:
        overview?.confirmedBookings ?? 0,

      description:
        "Active bookings",

      icon:
        CheckCircle2,

      color:
        "bg-emerald-50 text-emerald-600",
    },
  ];




  const packageRows =
    teacherPackages
      .slice(0, 4)
      .map((pkg) => [
        pkg.name,
        `${pkg.sessions} sessions`,
        `$${pkg.price}`,
        pkg.isActive
          ? "Active"
          : "Inactive",
      ]);



  if (isLoading) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }



  return (

    <div className="space-y-6">


      <TopNavbar
        title="Teacher Dashboard"
        subtitle="Manage students, packages, and sessions"
      />



      <TeacherHero

        greetingName={
          user?.firstName ?? "Teacher"
        }

        packageCount={
          teacherPackages.length
        }

      />



      <div className="grid gap-4 xl:grid-cols-4">

        {
          stats.map((item) => (
            <StatCard
              key={item.title}
              {...item}
            />
          ))
        }

      </div>




      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">


        <DashboardTable

          title="Package Catalog"

          description="Your teaching packages"

          columns={[
            "Package",
            "Sessions",
            "Price",
            "Status"
          ]}

          rows={
            packageRows
          }

        />



        <div className="space-y-4">


          <OverviewCard

            title="Teaching Overview"

            description="Your teaching activity summary"

            actionLabel="View Sessions"

            items={
              overviewItems
            }

            todaySessions={
              overview?.todaySessions ?? 0
            }

          />



          <NotificationsCard />


        </div>


      </div>


    </div>

  );
}