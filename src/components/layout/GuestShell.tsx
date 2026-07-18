"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";

const navLinks = [
  { label: "Find Teachers", href: ROUTES.teachers },
  { label: "Packages", href: ROUTES.packages },
  { label: "Profile", href: ROUTES.profile },
];

export function GuestShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-8 flex max-w-7xl items-center justify-between px-2 py-1 sm:px-2 lg:px-6">
          <Link href={ROUTES.home} className="flex items-center gap-0">
           
              <Image
                src="/LOGO.png"
                alt="Connect Guru"
                width={180}
                height={50}
                className="w-32 md:w-44 lg:w-64 h-18 object-contain"
              />
            <span className="text-lg font-semibold">Connect Guru</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={ROUTES.login} className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:inline-flex">
              Sign In
            </Link>
            <Link href={ROUTES.register} className="inline-flex rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Get Started
            </Link>
            <button onClick={() => setMobileOpen((prev) => !prev)} className="rounded-full p-2 hover:bg-slate-100 md:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                  {link.label}
                </Link>
              ))}
              <Link href={ROUTES.login} onClick={() => setMobileOpen(false)} className="rounded-full border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700">
                Sign In
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-slate-100/70">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Connect Guru. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
