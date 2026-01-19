export function hasPermission(
  userPermissions?: string[],
  required?: string[],
): boolean {
  if (!required || required.length === 0) return true;
  if (!userPermissions) return false;

  return required.every((permission) =>
    userPermissions.includes(permission),
  );
}
