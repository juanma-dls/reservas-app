import { UserType } from '@prisma/client';

// Interface realizada para poder interacutar con req en metodos de controladores protegidos
export interface AuthenticatedUser {
  id: string;
  email: string;
  type: UserType;
  permissions?: string[];
}
