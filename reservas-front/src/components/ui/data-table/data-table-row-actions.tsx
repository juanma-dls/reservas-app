import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Row } from "@tanstack/react-table";
import type { User } from "@/types/users/user";

interface DataTableRowActionsProps {
  row: Row<User>;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRestore: (user: User) => void;
}

export function DataTableRowActions({
  row,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: DataTableRowActionsProps) {
  const user = row.original;
  const isDeleted = !!user.deletedAt;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <a className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </a>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>

        {onView && (
          <DropdownMenuItem onClick={() => onView(user)}>
            Ver detalle
          </DropdownMenuItem>
        )}

        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(user)}>
            Editar
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        { !isDeleted ? (
          onDelete && (
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(user)}
            >
              Eliminar
            </DropdownMenuItem>
          )
        ) : (onRestore && (
            <DropdownMenuItem
              className="text-green-600"
              onClick={() => onRestore(user)}
            >
              Restaurar
            </DropdownMenuItem>
          )
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
