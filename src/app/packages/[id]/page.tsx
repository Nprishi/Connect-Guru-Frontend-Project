"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
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
import { usePackageQuery } from "@/hooks/useQueryHooks";
import { ArrowLeft, Clock3, DollarSign, Sparkles, Users } from "lucide-react";

export default function PackageDetailPage() {
  const params = useParams<{ id: string }>();
  const packageId = params?.id;
  const { data: pkg, isLoading, isError, error } = usePackageQuery(packageId);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Unable to load package details.");
    }
  }, [error, isError]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 py-4">
      <Link href="/packages" className="w-fit">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to packages
        </Button>
      </Link>

      <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <CardContent className="space-y-4 p-6 md:p-8">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="grid gap-3 md:grid-cols-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        ) : pkg ? (
          <>
            <CardHeader className="border-b border-slate-200 bg-slate-50 p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <Badge className="border-none bg-violet-100 text-violet-700">
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    Package Details
                  </Badge>
                  <CardTitle className="mt-3 text-2xl font-bold text-slate-900">{pkg.name}</CardTitle>
                  <CardDescription className="mt-2 text-sm text-slate-600">{pkg.description}</CardDescription>
                </div>
                <Badge variant={pkg.isActive ? "secondary" : "outline"}>
                  {pkg.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <DollarSign className="h-4 w-4 text-violet-600" />
                  Price
                </div>
                <p className="mt-2 text-xl font-semibold text-slate-900">${pkg.price}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Clock3 className="h-4 w-4 text-violet-600" />
                  Duration
                </div>
                <p className="mt-2 text-xl font-semibold text-slate-900">{pkg.durationInHours}h</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Users className="h-4 w-4 text-violet-600" />
                  Sessions
                </div>
                <p className="mt-2 text-xl font-semibold text-slate-900">{pkg.sessions}</p>
              </div>
            </CardContent>

            <CardContent className="border-t border-slate-200 p-6 md:p-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-900">Teacher Information</p>
                <p className="mt-2">
                  {pkg.teacher?.firstName || pkg.teacher?.lastName
                    ? `${pkg.teacher?.firstName ?? ""} ${pkg.teacher?.lastName ?? ""}`.trim()
                    : "Teacher details are not provided by the backend."}
                </p>
                {pkg.teacher?.email ? <p className="mt-1">{pkg.teacher.email}</p> : null}
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button disabled className="sm:min-w-40">Purchase</Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-6 md:p-8">
            <p className="text-sm text-slate-600">Package not found.</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
