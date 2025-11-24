import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/api/api';

const AuthInterceptor = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout({
            customAlert: {
              type: 'error',
              title: 'Sesión Expirada',
              message: 'Tu sesión ha caducado. Por favor, inicia sesión de nuevo.',
            },
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  return null;
};

export default AuthInterceptor;