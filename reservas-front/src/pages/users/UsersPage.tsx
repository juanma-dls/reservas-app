import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/services/AlertProvider";
import type { User } from "@/types/users/user";
import { DataTable } from "@/components/ui/data-table/data-table";
import { userColumns, type UserActionHandlers } from "./components/user-columns"; 
import { UserSearchFilter } from "./components/userSearchFields"; 
import { findBy, remove, restore } from "@/services/users.service"; 
import type { UserSearchParams } from "@/types/users/userSearchParams";
import { ActionConfirmDialog } from "@/components/ui/action-confirm-dialog";
import { LoadingOverlay } from "@/components/loading-overlay";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); 

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToActOn, setUserToActOn] = useState<User | null>(null);
  const [actionType, setActionType] = useState<'delete' | 'restore' | null>(null);

  const navigate = useNavigate();
  const { setAlert } = useAlert();
  
  const fetchUsers = useCallback(async (filters: UserSearchParams = {}) => {

    setLoading(true);
    try {
      const data = await findBy(filters); 
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setAlert({
        type: 'error',
        title: 'Error de Carga',
        message: 'No se pudieron obtener los datos de los usuarios.',
        duration: 4000
      });
    } finally {
      setLoading(false);
    }
  }, [setAlert]);

  const handleStartAction = useCallback((user: User, type: 'delete' | 'restore') => {
    setUserToActOn(user);
    setActionType(type);
    setIsDialogOpen(true);
  }, []);
  
  const handleDelete = useCallback((user: User) => {
    handleStartAction(user, 'delete');
  }, [handleStartAction]);

  const handleRestore = useCallback((user: User) => {
    handleStartAction(user, 'restore');
  }, [handleStartAction]);

  const handleConfirmAction = useCallback(async () => {
    if (!userToActOn || !actionType || !userToActOn.id) {
        setAlert({ type: 'error', title: 'Error', message: 'Fallo: Datos de usuario incompletos.' });
        setIsDialogOpen(false);
        setUserToActOn(null);
        return;
    }

    setIsDialogOpen(false); 
    
    try {
        const actionMessage = actionType === 'delete' ? 'Eliminado' : 'Restaurado';
        
        if (actionType === 'delete') {
            await remove(userToActOn.id); 
        } else {
            await restore(userToActOn.id); 
        }
        
        setAlert({ type: 'success', title: actionMessage, message: `Usuario ${actionMessage.toLowerCase()} correctamente.`, duration: 3000 });
        setRefreshKey(prev => prev + 1); 
        
    } catch (error) {
        setAlert({ type: 'error', title: 'Error', message: `Fallo al ${actionType === 'delete' ? 'eliminar' : 'restaurar'} el usuario.` });
    } finally {
        setUserToActOn(null);
        setActionType(null);
    }
  }, [userToActOn, actionType, setAlert]);


  useEffect(() => {
    fetchUsers({});
  }, [fetchUsers, refreshKey]);

  const handleSearch = (filters: UserSearchParams) => {
    fetchUsers(filters);
  };
  
  const actionHandlers: UserActionHandlers = {
    navigate,
    handleDelete: handleDelete,
    handleRestore: handleRestore,
  };

  // Lógica para el diálogo refactorizado
  const dialogTitle = actionType === 'delete' ? 'Confirmar Eliminación' : 'Confirmar Restauración';
  const confirmText = actionType === 'delete' ? 'Sí, Eliminar' : 'Sí, Restaurar';
  
  const dialogDescription = actionType && userToActOn ? (
    <>
        {actionType === 'delete' 
            ? '¿Estás seguro de que deseas eliminar al usuario: '
            : '¿Estás seguro de que deseas restaurar al usuario: '}
        
        <strong>{userToActOn.name} {userToActOn.lastname}</strong> ({userToActOn.email})? 
        
        {actionType === 'delete' 
            ? ' El usuario pasara a estar desactivado.' 
            : ' El usuario volverá a estar activo.'}
    </>
  ) : 'Cargando información...';


  return (
    <div className="p-8 min-h-screen">
      <h1 className="scroll-m-20 text-left mb-6 text-4xl font-extrabold tracking-tight text-balance">
        Gestión de Usuarios
      </h1>
      
      <div className="mb-6 flex justify-between items-center">
        <a href="/users/create" className="text-primary hover:underline font-medium">
          + Nuevo Usuario
        </a>
      </div>

      <div className="mb-6">
        <UserSearchFilter 
          onSearch={handleSearch} 
          isLoading={loading} 
        />
      </div>
      <div className="min-h-[400px]"> 
        <LoadingOverlay 
          isLoading={loading} 
          message="Cargando datos de los usuarios..."
        >
          <DataTable columns={userColumns(actionHandlers)} data={users} />
          {!loading && users.length === 0 && (
            <p className="text-center text-gray-500 py-10">No se encontraron usuarios que coincidan con los filtros.</p>
          )}
        </LoadingOverlay>
      </div>
      <ActionConfirmDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={dialogTitle}
        description={dialogDescription}
        onConfirm={handleConfirmAction}
        confirmButtonText={confirmText}
        isDestructive={actionType === 'delete'}
      />
    </div>
  );
};

export default UsersPage;
