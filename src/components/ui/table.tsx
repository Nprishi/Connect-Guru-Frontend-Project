import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return <table className={cn("w-full border-collapse text-sm", className)} {...props} />;
}

function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("bg-slate-50", className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn("divide-y divide-slate-200", className)} {...props} />;
}

function TableRow({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr className={cn("border-b border-slate-200", className)} {...props} />;
}

function TableHead({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return <th className={cn("px-3 py-2 text-left font-semibold text-slate-700", className)} {...props} />;
}

function TableCell({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return <td className={cn("px-3 py-2 text-slate-600", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
