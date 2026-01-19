import { hasPermission } from '@/utils/permissions';
import { useAuth } from '@/hooks/useAuth';

export function Can({
  permissions,
  children,
}: {
  permissions?: string[];
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!hasPermission(user?.permissions, permissions)) return null;

  return <>{children}</>;
}
