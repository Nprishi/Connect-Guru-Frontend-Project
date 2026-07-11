import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-slot="avatar" className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700", className)} {...props} />;
}

function AvatarImage({ className, ...props }: ComponentPropsWithoutRef<"img">) {
  return <img data-slot="avatar-image" className={cn("h-full w-full rounded-full object-cover", className)} {...props} />;
}

function AvatarFallback({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span data-slot="avatar-fallback" className={cn("text-sm", className)} {...props} />;
}

export { Avatar, AvatarImage, AvatarFallback };