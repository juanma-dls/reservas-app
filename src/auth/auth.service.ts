import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) return null;
    const isValid = await bcrypt.compare(user.password, foundUser.password);

    if (isValid) {
      return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
      });
    }
  }

  async register(data: RegisterDto) {
    const payloadForCreation: CreateUserDto = {
      ...data,
      type: 'USER',
    };

    const newUser = await this.userService.create(payloadForCreation);
    if (!newUser) {
      throw new InternalServerErrorException(
        'Registration failed due to a server error.',
      );
    }
    const token = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
    });

    return {
      user: newUser,
      token,
    };
  }
}
