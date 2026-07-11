"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerHref: string;
  footerLabel: string;
}

export function AuthCard({ title, subtitle, children, footerText, footerHref, footerLabel }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-4">
          <Badge variant="secondary">Connect Guru</Badge>
          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
          <CardDescription className="text-base">{subtitle}</CardDescription>
        </div>
        <Card className="border-slate-200 bg-slate-50 shadow-none">
          <CardContent className="pt-6">
            {children}
            <p className="mt-4 text-sm text-slate-600">
              {footerText}{" "}
              <Link href={footerHref} className="font-semibold text-blue-600 hover:underline">
                {footerLabel}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
