"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface Props<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: Props<TData, TValue>) {
  return (
    <a
      className="flex items-center gap-1 select-none"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="w-4 h-4 opacity-50" />
    </a>
  );
}
