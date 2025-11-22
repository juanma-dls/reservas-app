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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <FieldSeparator className='mt-3'/>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input id="name" type="name" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastname">Apellido</FieldLabel>
            <Input id="lastname" type="lastname" required />
          </Field>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="email@example.com" required />
          <FieldDescription>
            Lo utilizaremos para ponernos en contacto contigo. No compartiremos tu correo electrónico con nadie más.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
            Debe tener al menos 8 caracteres.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Por favor, confirme su contraseña.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Crear cuenta</Button>
        </Field>
        <FieldSeparator/>
        <Field>
          <FieldDescription className="px-6 text-center">
            ¿Ya tienes una cuenta? <a href="/login">Inicar Sesión</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
