"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePackagesQuery } from "@/hooks/useQueryHooks";
import { Clock3, DollarSign, Sparkles, Users } from "lucide-react";

export default function PackagesPage() {
  const { data: packages = [], isLoading, isError, error } = usePackagesQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Unable to load packages right now.");
    }
  }, [error, isError]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 py-4">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="border-none bg-violet-100 text-violet-700">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Available Packages
              </Badge>
              <h1 className="mt-3 text-2xl font-bold text-slate-900">Explore learning packages</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Browse current tutoring packages, review duration and session details, and prepare for your next learning plan.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="rounded-3xl border border-slate-200 bg-slate-50">
                  <CardHeader className="space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : packages.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg) => (
                <Card key={pkg._id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-900">{pkg.name}</CardTitle>
                        <CardDescription className="mt-2 text-sm text-slate-600">{pkg.description}</CardDescription>
                      </div>
                      <Badge variant={pkg.isActive ? "secondary" : "outline"}>
                        {pkg.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="mt-auto flex flex-col gap-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <DollarSign className="h-4 w-4 text-violet-600" />
                          Price
                        </div>
                        <p className="mt-2 text-lg font-semibold text-slate-900">${pkg.price}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Users className="h-4 w-4 text-violet-600" />
                          Sessions
                        </div>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{pkg.sessions}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Clock3 className="h-4 w-4 text-violet-600" />
                          Duration
                        </div>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{pkg.durationInHours}h</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Link href={`/packages/${pkg._id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button disabled className="flex-1">
                        Purchase
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500">TODO: Booking module pending.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-600">
              No packages available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}