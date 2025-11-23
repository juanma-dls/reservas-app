const PrivateHomePage = () => {
  return (
    <>
      <div className="lg:w-2/3 flex flex-col gap-6">
        
      </div>

      {/* Panel derecho / estadísticas o info adicional */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Resumen RSS</h3>
          <p className="text-sm text-muted-foreground">
            Aquí puedes mostrar estadísticas, últimas noticias, o cualquier información complementaria.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Accesos rápidos</h3>
          <p className="text-sm text-muted-foreground">
            Enlaces o acciones rápidas para la administración de la app.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivateHomePage;
