import { useAuth } from '@/hooks/useAuth';

export function useCan() {
  const { user } = useAuth();

  const can = (permission: string) => {
    return !!user?.permissions?.includes(permission);
  };

  return { can };
}