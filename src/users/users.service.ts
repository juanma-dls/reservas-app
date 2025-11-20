import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      } else {
        this.logger.error('Unexpected error');
      }
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    await this.ensureExistsAndNotDeleted(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      } else {
        this.logger.error('Unexpected error');
      }
    }
  }

  async remove(id: string) {
    await this.ensureExistsAndNotDeleted(id);

    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    const user = await this.findOne(id);

    if (!user.deletedAt) {
      throw new BadRequestException('User is not deleted');
    }

    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  private async ensureExistsAndNotDeleted(id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');
    if (user.deletedAt) throw new NotFoundException('User is deleted');

    return user;
  }
}
