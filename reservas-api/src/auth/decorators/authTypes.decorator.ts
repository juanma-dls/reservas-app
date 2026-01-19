import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';

export const TYPES_KEY = 'user_types';
export const AuthType = (...types: UserType[]) => SetMetadata(TYPES_KEY, types);
