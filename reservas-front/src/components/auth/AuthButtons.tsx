import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  const { token } = useAuth();

  if (token) return null;

  return (
    <>
      <Button variant="ghost" asChild>
        <a href="/login">Iniciar Sesión</a>
      </Button>
      <Button className="hidden md:block" asChild>
        <a href="/register" className="!text-primary-foreground hover:!text-primary-foreground" >Registrarse</a>
      </Button>
    </>
  );
};

export default AuthButtons;