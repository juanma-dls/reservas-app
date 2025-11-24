import { useAlert } from '@/services/AlertProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from './UsersForm';
import { createUser } from '@/services/users.service';


export function UserCreatePage() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    
    if (!data.password || data.password.length < 8) {
        setAlert({ 
            type: 'error', 
            title: 'Error', 
            message: 'La contraseña debe tener al menos 8 caracteres.',
            duration: 4000
        });
        setIsSubmitting(false);
        return;
    }

    try {
      await createUser(data); 
      
      setAlert({ 
        type: 'success', 
        title: 'Éxito', 
        message: 'Usuario creado correctamente.',
        duration: 3000, 
      });
      
      navigate('/users'); 
    } catch (error: any) {
      console.error("Error creating user:", error);
      
      const errorMessage = error.response?.data?.message || 'Fallo al crear el usuario. Revise los datos.';
      setAlert({ 
        type: 'error', 
        title: 'Error de Creación', 
        message: errorMessage,
        duration: 5000, 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-6 text-center">
        Crear Nuevo Usuario
      </h1>
      <UserForm 
        onSubmit={handleCreate} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}