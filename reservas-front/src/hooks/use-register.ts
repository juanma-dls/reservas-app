import { useState } from 'react';
import { register } from '@/services/auth';
import { useAuth } from '@/services/useAuth';
import { useNavigate } from 'react-router-dom';
import type { RegisterPayload } from '@/types/auth';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authContext = useAuth();
  const navigate = useNavigate();

  const submit = async (form: RegisterPayload) => {
    setError(null);
    setLoading(true);

    try {
      const { confirmPassword, ...payload } = form;
      const { token, user } = await register(payload);

      authContext.login(token, user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al registrar usuario:', err);

      let message = 'Error al crear la cuenta. Inténtalo de nuevo.';
      if (err instanceof Error) message = err.message;

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
