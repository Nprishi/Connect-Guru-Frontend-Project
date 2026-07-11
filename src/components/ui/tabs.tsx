import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-slot="tabs" className={cn("w-full", className)} {...props} />;
}

function TabsList({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-slot="tabs-list" className={cn("inline-flex rounded-lg border border-border bg-muted p-1", className)} {...props} />;
}

function TabsTrigger({ className, ...props }: ComponentPropsWithoutRef<"button">) {
  return <button data-slot="tabs-trigger" className={cn("rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground", className)} {...props} />;
}

function TabsContent({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-slot="tabs-content" className={cn("mt-4", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
