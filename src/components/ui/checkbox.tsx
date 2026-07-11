import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn("h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring", className)}
      {...props}
    />
  );
}

export { Checkbox };