import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-background py-7">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p className="">
          Diseñado React con shadcn/ui y Tailwind CSS. |
          <Button variant="ghost" asChild size="sm" className="">
            <a
              href="https://github.com/juanma-dls/reservas-app"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
          GitHub
            </a>
          </Button>
        </p>
        <p>
          © {new Date().getFullYear()} TurnosYa! / Juan Manuel de los Santos. Todos los derechos reservados.
        </p>
        <div className="mb-4 space-x-6">
          <a href="/privacy" className="hover:text-foreground">Política de Privacidad</a>
          <a href="/terms" className="hover:text-foreground">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
