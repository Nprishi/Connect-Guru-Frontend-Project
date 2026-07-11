import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Select({ className, ...props }: ComponentPropsWithoutRef<"select">) {
  return <select data-slot="select" className={cn("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none", className)} {...props} />;
}

export { Select };