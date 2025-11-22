import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <a href="/" className="text-2xl font-bold text-foreground">
        TurnosYa!
      </a>

      <nav className="hidden md:flex space-x-8 text-foreground">
        <a href="/services">Servicios</a>
        <a href="/about">Acerca de</a>
        <a href="/contact">Contacto</a>
      </nav>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <a href="/login">Iniciar Sesión</a>
        </Button>
        <Button className="hidden md:block" asChild>
          <a href="/register">Registrarse</a>
        </Button>
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
