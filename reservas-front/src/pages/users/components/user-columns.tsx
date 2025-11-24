import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table/data-table-row-actions";
import type { User } from "@/types/users/user";
import { formatDateTime } from "@/utils/formtDate";
import type { ColumnDef } from "@tanstack/react-table";

export interface UserActionHandlers {
  navigate: (path: string) => void;
  handleDelete: (user: User) => void; 
  handleRestore: (user: User) => void;
}

export const userColumns = (handlers: UserActionHandlers): ColumnDef<User>[] => [
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
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DataTableRowActions
          row={row}
          onView={() => handlers.navigate(`/users/${user.id}`)}
          onEdit={() => handlers.navigate(`/users/${user.id}/edit`)}
          onDelete={() => handlers.handleDelete(user)}
          onRestore={() => handlers.handleRestore(user)}
        />
      );
    },
  },
];
