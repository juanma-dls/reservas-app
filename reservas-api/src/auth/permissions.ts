import { UserType } from '@prisma/client';

export const ROLE_PERMISSIONS: Record<UserType, string[]> = {
  ADMIN: [
    'users.view',
    'users.edit',
    'users.delete',
    'users.create',
    'users.restore',
    'users.findId',
    'profile.view',
    'profile.edit',
  ],
  USER: ['profile.view'],
  CUSTOMER: ['profile.view'],
};
