import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const RootRedirect = () => {
  const { token } = useAuth();

  if (token) return <Navigate to="/dashboard" replace />;
  return <Navigate to="/home" replace />;
};

export default RootRedirect;