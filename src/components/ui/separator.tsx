import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Separator({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-slot="separator" className={cn("h-px w-full bg-border", className)} {...props} />;
}

export { Separator };
