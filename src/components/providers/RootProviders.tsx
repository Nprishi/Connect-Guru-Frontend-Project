/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "@/lib/auth";
import type { AuthUser } from "@/types/auth";

function AuthInitializer({ children }: { children: ReactNode }) {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const setReady = useAuthStore((state) => state.setReady);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const storedAuth = getStoredAuth();

        if (storedAuth.accessToken && storedAuth.user) {
            setAuth({
                accessToken: storedAuth.accessToken,
                refreshToken: storedAuth.refreshToken ?? "",
                user: storedAuth.user as AuthUser,
            });
        } else {
            clearAuth();
        }

        setReady(true);
        setHydrated(true);
    }, [setAuth, clearAuth, setReady]);

    useEffect(() => {
        const unsubscribe = useAuthStore.subscribe((state) => {
            if (state.accessToken && state.user) {
                setStoredAuth({
                    accessToken: state.accessToken,
                    refreshToken: state.refreshToken,
                    user: state.user,
                });
            } else {
                clearStoredAuth();
            }
        });

        return unsubscribe;
    }, []);

    if (!hydrated) {
        return null;
    }

    return <>{children}</>;
}

export function RootProviders({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthInitializer>{children}</AuthInitializer>
        </QueryClientProvider>
    );
}
