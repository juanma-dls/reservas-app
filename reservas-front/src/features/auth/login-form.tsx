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

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)} {...props}>
      <Card className="w-full max-w-md border shadow-xl bg-card/90 bg-surface text-surface-foreground shadow-lg border">
        <CardHeader>
          <div className="text-3xl text-center font-extrabold title">
            TurnosYa!
          </div>
          <FieldSeparator className="mb-4" />
          <CardTitle>Inicie sesión en su cuenta</CardTitle>
          <CardDescription className='text-inherit'>
            Introduce tu correo electrónico para iniciar sesión en tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="email@example.com" className="h-11" required />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <Input id="password" type="password" className="h-11" required />
              </Field>

              <Button className="w-full h-11 text-base mt-4">
                Iniciar Sesión
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
