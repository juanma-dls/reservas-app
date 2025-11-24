import { FieldDescription } from '@/components/ui/field';
import { Check, X, Info } from 'lucide-react';

interface PasswordValidationMessageProps {
  value: string; 
  mainPassword?: string;
  isConfirmation?: boolean;
  isSecurityField?: boolean;
}

const MIN_LENGTH = 8;

export function PasswordValidationMessage({ 
  value, 
  mainPassword, 
  isConfirmation = false,
  isSecurityField = false
}: PasswordValidationMessageProps) {
  
  const isEmpty = value.length === 0;

  let className = 'text-muted-foreground';
  let message = '';
  let icon = <Info className="h-4 w-4 mr-1" />;

  const changingPassword = isSecurityField && !!mainPassword;

  if (isSecurityField) {
    if (changingPassword) {
      const passwordMismatch = mainPassword !== value;
      
      if (isEmpty) {
        className = 'text-muted-foreground';
        message = 'Repita la nueva contraseña.';
      } else if (passwordMismatch) {
        className = 'text-red-500';
        message = 'Las nuevas contraseñas NO coinciden.';
        icon = <X className="h-4 w-4 mr-1" />;
      } else {
        className = 'text-green-500';
        message = 'Las contraseñas coinciden.';
        icon = <Check className="h-4 w-4 mr-1" />;
      }

    // No cambiando la Contraseña (isSecurityField actúa como Seguridad)
    } else {
      if (isEmpty) {
        className = 'text-muted-foreground';
        message = 'Requerido: Ingrese su contraseña actual para guardar cambios.';
      } else {
        className = 'text-green-500';
        message = 'Contraseña actual ingresada, lista para verificación.';
        icon = <Check className="h-4 w-4 mr-1" />;
      }
    }

  //Confirmación de Contraseña (Modo Creación)
  } else if (isConfirmation) {
    const passwordMismatch = mainPassword !== value;

    if (isEmpty) {
      className = 'text-muted-foreground';
      message = 'Repita la contraseña principal.';
    } else if (passwordMismatch) {
      className = 'text-red-500';
      message = 'Las contraseñas NO coinciden.';
      icon = <X className="h-4 w-4 mr-1" />;
    } else {
      className = 'text-green-500';
      message = 'Las contraseñas coinciden.';
      icon = <Check className="h-4 w-4 mr-1" />;
    }

  //Contraseña Principal (Validación de Requisitos, tanto en Creación como Edición)
  } else {
    const isTooShort = value.length < MIN_LENGTH;
    
    if (isEmpty) {
      className = 'text-muted-foreground';
      message = `Debe tener al menos ${MIN_LENGTH} caracteres.`;
    } else if (isTooShort) {
      className = 'text-red-500';
      message = `Mínimo ${MIN_LENGTH} caracteres requerido.`;
      icon = <X className="h-4 w-4 mr-1" />;
    } else {
      className = 'text-green-500';
      message = 'Longitud mínima cumplida.';
      icon = <Check className="h-4 w-4 mr-1" />;
    }
  }

  return (
    <FieldDescription className={`flex items-center mt-1 ${className}`}>
      {icon}
      {message}
    </FieldDescription>
  );
}