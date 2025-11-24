import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserFormPayload } from '@/types/users/userFormPayload';
import { Card, CardContent } from '@/components/ui/card';
import { PasswordValidationMessage } from '@/components/ui/password-validation-message';
import { useAlert } from '@/services/AlertProvider';

interface UserFormProps {
  initialData?: Omit<UserFormPayload, 'password'>;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

const getInitials = (name: string, lastname: string) => {
  if (!name || !lastname) return '';
  return `${name[0].toUpperCase()}${lastname[0].toUpperCase()}`;
};

type UserType = 'ADMIN' | 'CUSTOMER' | 'USER';

export function UserForm({ initialData, onSubmit, isSubmitting }: UserFormProps) {
  const isEditing = !!initialData;
  const { setAlert } = useAlert();
  
  const [formData, setFormData] = useState<UserFormPayload & { confirmPassword?: string }>({
    name: initialData?.name ?? '',
    lastname: initialData?.lastname ?? '',
    email: initialData?.email ?? '',
    type: initialData?.type ?? 'USER',
    password: '',
    confirmPassword: '',
    newPassword: '',
    avatar: initialData?.avatar ?? undefined,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (value: UserType) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const passwordValue = formData.password || '';
    const currentPasswordValue = formData.confirmPassword || '';

    if (!isEditing) {
      if (passwordValue !== currentPasswordValue) {
        setAlert({ 
          type: 'error', 
          title: 'Error de Contraseña', 
          message: 'La Contraseña y la Confirmación deben coincidir.', 
          duration: 4000 
        });
        return;
      }
    }

    const { 
      confirmPassword,
      avatar,
      password,
      newPassword,
      ...dataToSend 
    } = formData;
    
    if (isEditing) {
      const newPasswordValue = formData.password || '';
      const currentPasswordValue = formData.confirmPassword || '';
      
      delete dataToSend.email;

      if (!currentPasswordValue) {
        return;
      }

      (dataToSend as any).currentPassword = currentPasswordValue;

      if (newPasswordValue.length > 0) {
        (dataToSend as any).newPassword = newPasswordValue;
      }
      console.log(dataToSend);
    }
    
    await onSubmit(dataToSend);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-3 mb-6">
            <Avatar className="h-20 w-20 border-2 border-primary/50 flex-shrink-0">
              {formData.avatar ? (
                <AvatarImage src={formData.avatar} alt={formData.name} /> 
              ) : (
                <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground">
                  {getInitials(formData.name, formData.lastname)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className='mb-3' htmlFor="name">Nombre</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label className='mb-3' htmlFor="lastname">Apellido</Label>
              <Input id="lastname" type="text" value={formData.lastname} onChange={handleInputChange} required />
            </div>
          </div>

          <div>
            <Label className='mb-3' htmlFor="email">Email</Label>
            <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
                disabled={isEditing} 
            />
            {isEditing && <p className="text-sm text-muted-foreground mt-1">El email no puede ser modificado.</p>}
          </div>

          <div>
            <Label className='mb-3' htmlFor='type'>Tipo de Usuario</Label>
            <Select value={formData.type} onValueChange={handleSelectChange as (value: string) => void}> 
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">Usuario Estándar</SelectItem>
                <SelectItem value="CUSTOMER">Cliente</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className='mb-3' htmlFor="password">{isEditing ? 'Nueva Contraseña (opcional)' : 'Contraseña'}</Label>
            <Input 
              id="password" 
              type="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              required={!isEditing} 
              placeholder={isEditing ? 'Dejar vacío para no cambiar' : 'Mínimo 8 caracteres'}
            />
            <PasswordValidationMessage 
              value={formData.password || ''}
              isConfirmation={false}
              isSecurityField={false}
            />
          </div>

          <div>
            <Label className='mb-3' htmlFor="confirmPassword">
              {isEditing ? 'Contraseña Actual (para guardar cambios)' : 'Confirmar Contraseña'}
            </Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={handleInputChange} 
              required={true}
              placeholder={isEditing ? 'Ingrese su contraseña actual' : 'Repita la contraseña'}
            />
            <PasswordValidationMessage 
              value={formData.confirmPassword || ''}
              mainPassword={formData.password}
              isConfirmation={!isEditing}
              isSecurityField={isEditing}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Guardando...' : 'Creando...'}
              </>
            ) : (
              isEditing ? 'Guardar Cambios' : 'Crear Usuario'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
