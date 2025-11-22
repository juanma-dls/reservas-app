import { Navigate } from 'react-router-dom';
import { useAuth } from '@/services/useAuth';
import type { JSX } from 'react/jsx-runtime';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : children;
};