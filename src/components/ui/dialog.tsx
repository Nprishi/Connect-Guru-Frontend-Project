import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type DialogProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function Dialog({ children, open = true }: DialogProps) {
  if (!open) {
    return null;
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">{children}</div>;
}

function DialogContent({ className, children }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("w-full max-w-lg rounded-2xl border border-border bg-white p-6 shadow-lg", className)}>{children}</div>;
}

function DialogHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mb-4 space-y-1", className)} {...props} />;
}

function DialogTitle({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return <h2 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />;
}

function DialogDescription({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-slate-600", className)} {...props} />;
}

function DialogFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-6 flex justify-end gap-2", className)} {...props} />;
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
