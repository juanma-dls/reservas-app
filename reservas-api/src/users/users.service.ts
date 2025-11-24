import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

type SafeUser = Omit<User, 'password'>;

export interface FindByParams extends Partial<User> {
  deletedUsers?: boolean;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  private selectSafeUser(user: User): SafeUser {
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  private async findOneWithPassword(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  private async ensureExistsAndNotDeleted(id: string): Promise<User> {
    const user = await this.findOneWithPassword(id);

    if (user.deletedAt) throw new NotFoundException('User is deleted');

    return user;
  }

  async create(data: CreateUserDto): Promise<SafeUser> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = await this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });

      return this.selectSafeUser(user);
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email is already registered');
        }
      }
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      throw new InternalServerErrorException('Unexpected server error');
    }
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });

    return users.map((user) => this.selectSafeUser(user));
  }

  async findOne(id: string): Promise<SafeUser> {
    const user = await this.findOneWithPassword(id);

    return this.selectSafeUser(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<SafeUser> {
    try {
      const user = await this.ensureExistsAndNotDeleted(id);

      const { currentPassword, newPassword, ...rest } = data;

      if (!currentPassword) {
        throw new UnauthorizedException(
          'Debe ingresar su contraseña actual para realizar cambios.',
        );
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isValidPassword && !newPassword) {
        throw new UnauthorizedException('La contraseña actual es incorrecta.');
      }

      const changes: Prisma.UserUpdateInput = { ...rest };

      if (newPassword) {
        if (newPassword.length < 8) {
          throw new BadRequestException(
            'La nueva contraseña debe tener al menos 8 caracteres.',
          );
        }

        changes.password = await bcrypt.hash(newPassword, 10);
      }

      const updated = await this.prisma.user.update({
        where: { id },
        data: changes,
      });

      return this.selectSafeUser(updated);
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;

      this.logger.error(error instanceof Error ? error.message : error);
      throw new InternalServerErrorException(
        'No se pudo actualizar el usuario.',
      );
    }
  }

  async remove(id: string): Promise<SafeUser> {
    await this.ensureExistsAndNotDeleted(id);

    const deleted = await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.selectSafeUser(deleted);
  }

  async restore(id: string): Promise<SafeUser> {
    const user = await this.findOneWithPassword(id);

    if (!user.deletedAt) {
      throw new BadRequestException('User is not deleted');
    }

    const restore = await this.prisma.user.update({
      where: { id },
      data: { deletedAt: null },
    });

    return this.selectSafeUser(restore);
  }

  async findBy(params: FindByParams): Promise<SafeUser[]> {
    const { deletedUsers, ...searchFilters } = params;

    const where: Prisma.UserWhereInput = {
      deletedAt: deletedUsers ? { not: null } : null,
      AND: [],
    };

    if (searchFilters.email) {
      (where.AND as Prisma.UserWhereInput[]).push({
        email: { contains: searchFilters.email, mode: 'insensitive' },
      });
    }
    if (searchFilters.name) {
      (where.AND as Prisma.UserWhereInput[]).push({
        name: { contains: searchFilters.name, mode: 'insensitive' },
      });
    }
    if (searchFilters.lastname) {
      (where.AND as Prisma.UserWhereInput[]).push({
        lastname: { contains: searchFilters.lastname, mode: 'insensitive' },
      });
    }
    if (searchFilters.type) {
      (where.AND as Prisma.UserWhereInput[]).push({
        type: searchFilters.type,
      });
    }

    if ((where.AND as Prisma.UserWhereInput[]).length === 0) {
      delete where.AND;
    }

    const users = await this.prisma.user.findMany({
      where,
    });

    return users.map((user) => this.selectSafeUser(user));
  }
}
