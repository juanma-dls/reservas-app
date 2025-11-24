import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '@/services/users.service';
import type { User } from '@/types/users/user';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/services/AlertProvider';
import { UserForm } from './UsersForm';
import { Reload } from '@/components/ui/reload';

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    getUserById(id)
      .then(setUser)
      .catch((error: unknown) => {
        console.error("Error fetching user:", error);
        setAlert({ type: 'error', title: 'Error', message: 'No se pudo cargar el usuario para edición.', duration: 5000 });
      })
      .finally(() => setLoading(false));
      
  }, [id, setAlert]);

  const handleUpdate = async (data: any) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      const updatedUser = await updateUser(id, data);
      
      setAlert({ 
        type: 'success', 
        title: 'Éxito', 
        message: `Usuario ${updatedUser.name} actualizado correctamente.`,
        duration: 3000
      });
      
      navigate('/users');
    } catch (error: any) {
      console.error("Error updating user:", error);
      const errorMessage = error.response?.data?.message || 'Fallo al actualizar el usuario.';
      setAlert({ type: 'error', title: 'Error de Edición', message: errorMessage, duration: 50000 });
    } finally {
      setIsSubmitting(false);
    }
  };

    if (loading) return <p className="p-8 text-center"><Reload message="Cargando datos del usuario..." /></p>;
  if (!user) return <div className="p-8 text-center text-red-500">Usuario no encontrado o ID inválido.</div>;

  type UserLiteralType = 'ADMIN' | 'CUSTOMER' | 'USER';

  const getSafeType = (type: string | undefined): UserLiteralType => {
    const validTypes: UserLiteralType[] = ['ADMIN', 'CUSTOMER', 'USER'];
      
    if (type && validTypes.includes(type as UserLiteralType)) {
        return type as UserLiteralType;
    }
    return 'USER';
  };

  const initialDataForForm = {
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    type: getSafeType(user.type), 
    avatar: user.avatarUrl || user.avatar || undefined, 
  };

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Editar Usuario
          </h1>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)} className="min-w-[100px]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </div>
        
      <UserForm 
        initialData={initialDataForForm} 
        onSubmit={handleUpdate} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}