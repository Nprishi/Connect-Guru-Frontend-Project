import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: ComponentPropsWithoutRef<"label">) {
  return <label data-slot="label" className={cn("text-sm font-medium text-slate-700", className)} {...props} />;
}

export { Label };