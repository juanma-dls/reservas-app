import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from './button';

export interface ActionConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: React.ReactNode;
  
  onConfirm: () => void;
  
  confirmButtonText?: string;
  cancelButtonText?: string;
  
  isDestructive?: boolean;
}

export const ActionConfirmDialog: React.FC<ActionConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  isDestructive = false,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={onConfirm} 
          >
            <Button variant={isDestructive ? 'destructive' : 'default'}>
              {confirmButtonText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};