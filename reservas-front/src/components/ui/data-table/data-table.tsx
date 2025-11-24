import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils"; // Si no lo tenés, te paso la función

// Tu tipo base para soportar deletedAt
interface WithDeletedAt {
  deletedAt?: string | Date | null;
}

interface DataTableProps<TData extends WithDeletedAt, TValue> {
  columns: any;
  data: TData[];
}

export function DataTable<TData extends WithDeletedAt, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-xl bg-card border overflow-hidden w-full shadow-lg">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider py-3"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => {
              const inactive = !!row.original.deletedAt;

              return (
                <TableRow
                  key={row.id}
                  title={inactive ? "Registro inactivo" : undefined}
                  className={cn(
                    "transition-colors",
                    inactive
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-muted/40 cursor-pointer"
                  )}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24 text-muted-foreground">
                No hay registros.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
