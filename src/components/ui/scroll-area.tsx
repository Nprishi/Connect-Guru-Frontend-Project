"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/utils";

function ScrollArea({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root className={cn("relative overflow-hidden", className)} {...props}>
      {children}
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollAreaViewport({ className, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>) {
  return <ScrollAreaPrimitive.Viewport className={cn("h-full w-full rounded-[inherit]", className)} {...props} />;
}

function ScrollAreaScrollbar({ className, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "flex touch-none select-none p-0.5 transition-colors duration-150 ease-out hover:bg-slate-100 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=horizontal]:mt-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:w-full",
        className
      )}
      {...props}
    />
  );
}

function ScrollAreaThumb({ className, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb>) {
  return <ScrollAreaPrimitive.Thumb className={cn("relative flex-1 rounded-full bg-slate-400", className)} {...props} />;
}

export { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb };
