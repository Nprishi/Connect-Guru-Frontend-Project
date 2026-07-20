"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPackages } from "@/api/package.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CalendarRange, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

interface PackageType {
  id: string;
  name: string;
  sessions: number;
  description: string;
  price: number;
}

export default function PackagesPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackages()
      .then((items) => {
        setPackages(items || []);
      })
      .catch(() => {
        setPackages([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePurchase = (packageId: string) => {

    router.push(`/checkout?packageId=${packageId}`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 font-sans text-left">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-border bg-linear-to-r from-background via-card to-background p-8 md:p-10 shadow-soft">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <Badge className="bg-primary/10 hover:bg-primary/15 text-primary border-none px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 inline fill-primary/10" />
            Pricing Plans
          </Badge>
          <h1 className="text-[32px] md:text-[36px] font-bold tracking-tight text-heading leading-tight">
            Learning packages
          </h1>
          <p className="text-[15px] font-medium text-body leading-relaxed">
            Choose a flexible package suited perfectly to your learning pace and current goals.
          </p>
        </div>
      </div>

      {/* Loading & Package Display States */}
      {loading ? (
        <div className="flex h-40 w-full items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-[14px] font-semibold text-body">Loading dynamic plans...</span>
        </div>
      ) : packages && packages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="group relative rounded-[24px] border border-border bg-card shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-primary to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-[20px] font-bold text-heading tracking-tight mt-1 leading-snug">
                      {pkg.name}
                    </CardTitle>
                    <Badge className="bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/15 border-none px-3 py-1 text-[12px] font-semibold flex items-center gap-1 rounded-full whitespace-nowrap">
                      <CalendarRange className="h-3.5 w-3.5" />
                      {pkg.sessions} sessions
                    </Badge>
                  </div>
                  <CardDescription className="text-[14px] text-body mt-2.5 leading-relaxed min-h-12">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>

                <div className="px-6 py-2 space-y-2.5 border-t border-border/50">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span className="text-[13px] font-semibold text-heading">Flexible access anytime</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span className="text-[13px] font-semibold text-heading">1-on-1 expert matching</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 pt-4 border-t border-border/50 mt-auto flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-bold text-muted uppercase tracking-wider">Total Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] font-bold tracking-tight text-heading">${pkg.price}</span>
                    <span className="text-[13px] font-semibold text-muted">/pkg</span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  className="w-full h-11 rounded-[14px] bg-primary hover:bg-primary-hover text-[14px] font-semibold text-white shadow-soft transition-all duration-200 gap-1.5 flex items-center justify-center group-hover:scale-[1.01]"
                >
                  Buy now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-border bg-card p-12 text-center shadow-soft">
          <p className="text-body font-semibold text-[15px]">No learning packages available right now.</p>
        </div>
      )}
    </div>
  );
}