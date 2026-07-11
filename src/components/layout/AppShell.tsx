"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.replace(ROUTES.login);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href={ROUTES.home} className="text-lg font-semibold text-slate-900">
            Connect Guru
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href={ROUTES.teachers}>Teachers</Link>
            <Link href={ROUTES.packages}>Packages</Link>
            <Link href={ROUTES.profile}>Profile</Link>
            {user ? (
              <button onClick={handleLogout} className="rounded-full bg-slate-900 px-3 py-1.5 text-white">
                Logout
              </button>
            ) : (
              <Link href={ROUTES.login} className="rounded-full bg-blue-600 px-3 py-1.5 text-white">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      {pathname === ROUTES.home && (
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
          Built for student-teacher connections.
        </footer>
      )}
    </div>
  );
}
