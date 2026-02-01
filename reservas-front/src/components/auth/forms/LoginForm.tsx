import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, type FormEvent } from 'react';
import { login } from '@/services/auth';
import type { LoginPayload } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '@/services/AlertProvider';
import { Loader2 } from 'lucide-react';
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' });
  const [, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { token, user } = await login(form);
      authContext.login(token, user);

      if (token && user) {
        authContext.login(token, user);
        navigate('/dashboard');
      } else {
        setAlert({
          type: 'error',
          title: 'Fallo de Autenticación',
          message: 'No se pudo obtener la información del usuario',
          duration: 3000,
  });
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setAlert({
        type: 'error',
        title: 'Fallo de Autenticación',
        message: 'El email o la contraseña son incorrectos.',
        duration: 3000,
  });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn('bg-surface flex flex-col items-center justify-center', className)} {...props}>
      <Card className="w-full max-w-md shadow-xl border bg-surface text-surface-foreground">
        <CardHeader>
          <a href="/" className="text-3xl text-center font-extrabold title text-4xl">
            TurnosYa!
          </a>
          <FieldSeparator className="mb-4" />
          <CardTitle>Inicie sesión en su cuenta</CardTitle>
          <CardDescription className='text-inherit'>
            Introduce tu correo electrónico para iniciar sesión en tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@example.com" 
                  className="h-11" 
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  } />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-11 pr-10"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <IconEyeOff size={20} />
                    ) : (
                      <IconEye size={20} />
                    )}
                  </button>
                </div>
              </Field>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>

              <FieldSeparator />

              <FieldDescription className="text-center">
                ¿No tienes una cuenta? <a href="/register" className="underline underline-offset-4">Registrarse</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
