import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { JSX } from 'react/jsx-runtime';
import { useAlert } from '@/services/AlertProvider';
import { useEffect } from 'react';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token, isLoggingOut } = useAuth();
  const { setAlert } = useAlert();
  const location = useLocation();

  useEffect(() => {
    if (!token && !isLoggingOut) {
      setAlert({
        type: "error",
        title: "Acceso denegado",
        message: "Debes iniciar sesión para continuar.",
        duration: 3000,
      });
    }
  }, [token]);

  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : children;
};