import { RegisterForm } from '@/features/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2"> 
      <div className="relative hidden lg:block bg-muted">
        <img
          src="/image-register.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4 md:p-6 lg:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex items-center justify-center py-12 lg:py-20"> 
          <div className="w-full max-w-sm lg:max-w-md">
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
              <p className="text-muted-foreground text-sm text-balance">
            Complete el siguiente formulario para crear su cuenta.
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}