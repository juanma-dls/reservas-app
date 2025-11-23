import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table/data-table-row-actions";
import type { User } from "@/types/user";
import { formatDateTime } from "@/utils/formtDate";
import type { ColumnDef } from "@tanstack/react-table";

export const userColumns = (navigate: (path: string) => void): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creado" />
    ),
    cell: ({ row }) => formatDateTime(row.getValue("createdAt") as string),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actualizado" />
    ),
    cell: ({ row }) => formatDateTime(row.getValue("updatedAt") as string),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={(user) => navigate(`/users/${user.id}`)}
        onEdit={(user) => navigate(`/users/${user.id}/edit`)}
        onDelete={(user) => console.log("Eliminar", user)}
      />
    ),
  },
];
