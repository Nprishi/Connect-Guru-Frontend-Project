import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "destructive";
}

function Alert({ className, variant = "default", ...props }: AlertProps) {
  const variantStyles = {
    default: "bg-slate-50 text-slate-900 border border-slate-200",
    destructive: "bg-red-50 text-red-900 border border-red-200",
  };

  return <div className={cn("rounded-2xl px-4 py-3 text-sm", variantStyles[variant], className)} {...props} />;
}

export { Alert };
