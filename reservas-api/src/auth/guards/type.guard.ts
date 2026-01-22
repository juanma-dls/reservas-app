import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';
import { Request } from 'express';
import { TYPES_KEY } from '../decorators/authTypes.decorator';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class TypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<UserType[]>(
      TYPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredTypes || requiredTypes.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser;

    if (!user?.type) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (!requiredTypes.includes(user.type)) {
      throw new ForbiddenException(
        'El usuario no tiene permisos para acceder a este recurso.',
      );
    }

    return true;
  }
}
