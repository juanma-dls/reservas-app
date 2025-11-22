import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Home = () => {
  return (
    <><><Navbar /><div className="min-h-screen bg-background">
      <main>
        <section className="bg-gradient-to-b from-primary/20 to-secondary/20 py-28 text-center rounded-b-3xl">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Reserva tus servicios al instante
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Tu tiempo es valioso. Organizamos tus citas fácilmente.
            </p>
            <Button size="lg" className="mt-10 px-8 py-6 text-lg rounded-2xl shadow-md">
              Reservar Ahora
            </Button>
          </div>
        </section>

        <section className="container mx-auto py-20 px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Servicios Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <Card className="text-center text-lg font-medium rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
              Peluquería
            </Card>
            <Card className="text-center text-lg font-medium rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
              Mecánica
            </Card>
            <Card className="text-center text-lg font-medium rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
              Salud
            </Card>
          </div>
        </section>
      </main>
    </div></><Footer /></>
  );
};

export default Home;
