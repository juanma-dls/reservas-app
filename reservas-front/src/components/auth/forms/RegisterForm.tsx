import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { register } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { RegisterPayload } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [form, setForm] = useState<RegisterPayload>({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useAuth();
  const navigate = useNavigate();

  const passwordMismatch = 
    form.confirmPassword.length > 0 && 
    form.password !== form.confirmPassword;

  const isPasswordTooShort = form.password.length > 0 && form.password.length < 8;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isPasswordTooShort || passwordMismatch) {
        return;
    }
    
    setLoading(true);

    try {
      const { confirmPassword: _, ...payload } = form;
      const { token, user } = await register(payload);
      
      authContext.login(token, user);
      navigate('/dashboard'); 

    } catch (err) {
      console.error('Error al registrar usuario:', err);
      
      let errorMessage = 'Error al crear la cuenta. Inténtalo de nuevo.';
      
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
        errorMessage = (err as any).message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <FieldSeparator className='mt-3'/>

        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input 
              id="name" 
              type="text" 
              required 
              value={form.name} 
              onChange={handleInputChange} 
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastname">Apellido</FieldLabel>
            <Input 
              id="lastname" 
              type="text" 
              required 
              value={form.lastname} 
              onChange={handleInputChange} 
            />
          </Field>
        </Field>
        
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="email@example.com" 
            required 
            value={form.email}
            onChange={handleInputChange}
          />
          <FieldDescription>
            Lo utilizaremos para ponernos en contacto contigo. No compartiremos tu correo electrónico con nadie más.
          </FieldDescription>
        </Field>
        
        {/* Contraseña */}
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            required 
            value={form.password}
            onChange={handleInputChange}
          />
          <FieldDescription
            className={
              form.password.length === 0
                ? 'text-muted-foreground'
                : form.password.length >= 8
                ? 'text-green-500'
                : 'text-red-500'
            }
          >
            Debe tener al menos 8 caracteres.
          </FieldDescription>
        </Field>
        
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirmar contraseña</FieldLabel>
          <Input 
            id="confirmPassword"
            type="password" 
            required 
            value={form.confirmPassword}
            onChange={handleInputChange}
          />
          <FieldDescription
            className={
              form.confirmPassword.length === 0
                ? 'text-muted-foreground'
                : passwordMismatch
                ? 'text-red-500' 
                : 'text-green-500'
            }
          >
            {form.confirmPassword.length === 0
              ? 'Por favor, confirme su contraseña.'
              : passwordMismatch
              ? 'Las contraseñas no coinciden.'
              : 'Las contraseñas coinciden.'
            }
          </FieldDescription>
        </Field>

        {error && (
            <div className="text-red-500 text-sm text-center font-medium mt-2">{error}</div>
        )}
        <Field>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || passwordMismatch || isPasswordTooShort || form.password.length === 0 || form.confirmPassword.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </Field>
        
        <FieldSeparator/>
        
        <Field>
          <FieldDescription className="px-6 text-center">
            ¿Ya tienes una cuenta? <a href="/login" className='underline underline-offset-4'>Inicar Sesión</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}