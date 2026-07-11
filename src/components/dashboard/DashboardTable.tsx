import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ReactNode } from "react";

interface DashboardTableProps {
  title: string;
  description: string;
  columns: string[];
  rows: Array<ReactNode[]>;
}

export function DashboardTable({ title, description, columns, rows }: DashboardTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] w-full rounded-b-2xl border-t border-slate-200 bg-white">
          <ScrollAreaViewport className="w-full">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((cells, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {cells.map((cell, cellIndex) => (
                      <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
