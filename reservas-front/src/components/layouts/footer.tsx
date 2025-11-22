const Footer = () => {
  return (
    <footer className="border-t bg-background py-10">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="mb-4 space-x-6">
          <a href="/privacy" className="hover:text-foreground">Política de Privacidad</a>
          <a href="/terms" className="hover:text-foreground">Términos de Servicio</a>
        </div>

        <p>
          © {new Date().getFullYear()} TurnosYa! / Juan Manuel de los Santos. Todos los derechos reservados.
        </p>
        <p className="mt-1">
          Diseñado con shadcn/ui y Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
