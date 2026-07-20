"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureItem {
  icon: LucideIcon;
  text: string;
}

interface AuthCardProps {
  title: string;
  subtitle: string;

  badge?: string;
  heading?: string;
  description?: string;

  image?: string;
  features?: FeatureItem[];

  children: ReactNode;

  footerText: string;
  footerHref: string;
  footerLabel: string;
}

export function AuthCard({
  title,
  subtitle,
  badge,
  heading,
  description,
  image,
  features = [],
  children,
  footerText,
  footerHref,
  footerLabel,
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative hidden overflow-hidden bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              {badge && (
                <Badge className="border-white/20 bg-white/15 text-white backdrop-blur">
                  {badge}
                </Badge>
              )}

              <h1 className="mt-6 text-4xl font-bold leading-tight">
                {heading ?? title}
              </h1>

              <p className="mt-4 max-w-md text-blue-100">
                {description ?? subtitle}
              </p>

              {image && (
                <div className="mt-10 flex justify-center">
                  <Image
                    src={image}
                    alt={title}
                    width={480}
                    height={420}
                    priority
                    className="h-auto max-h-420px w-auto object-contain drop-shadow-2xl rounded-4xl"
                  />
                </div>
              )}

              {features.length > 0 && (
                <div className="mt-10 space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-700">
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className="font-medium">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>


          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <Card className="w-full max-w-md border-0 shadow-none">
              <CardContent className="space-y-6 p-0">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {title}
                  </h2>

                  <p className="mt-2 text-slate-500">{subtitle}</p>
                </div>

                {children}

                <p className="text-center text-sm text-slate-500">
                  {footerText}{" "}
                  <Link
                    href={footerHref}
                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    {footerLabel}
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}