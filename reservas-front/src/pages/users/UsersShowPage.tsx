import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/ui/detail-item";
import { ArrowLeft, Pencil } from "lucide-react";
import { getUserById } from "@/services/users";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime } from "@/utils/formtDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/user";

export default function UserShowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        console.error("Error loading user", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando...</p>;
  if (!user) return <p className="text-center py-10">Usuario no encontrado</p>;

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Detalle del usuario</h1>
          <p className="text-lg text-muted-foreground mt-1">Información completa de la cuenta.</p>
        </div>
      </div>

      <Card className="w-full shadow-xl">
        {/* Fila principal: Avatar | Info | Acciones */}
        <CardHeader className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="size-20 border-2 border-primary/50 flex-shrink-0">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : (
                <AvatarFallback className="text-2xl font-medium bg-primary text-primary-foreground">
                  {user.name[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name} {user.lastname}</h2>
                <p className="text-base text-muted-foreground mt-1">{user.email}</p>
              </div>

              <div className="flex md:justify-end gap-2">
                <Button variant="outline" onClick={() => navigate(-1)} className="min-w-[100px]">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Volver
                </Button>
                <Button onClick={() => navigate(`/users/${user.id}/edit`)} className="min-w-[100px]">
                  <Pencil className="w-4 h-4 mr-2" /> Editar
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <DetailItem label="Nombre" value={user.name} />
          <DetailItem label="Apellido" value={user.lastname} />
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Fecha de Creación" value={formatDateTime(user.createdAt)} />
          <DetailItem label="Última Actualización" value={formatDateTime(user.updatedAt)} />
        </CardContent>
      </Card>
    </div>
  );
}
