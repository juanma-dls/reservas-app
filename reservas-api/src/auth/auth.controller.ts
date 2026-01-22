import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { ROLE_PERMISSIONS } from './permissions';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Post('login')
  @Public()
  async login(@Body() data: LoginDto) {
    const loginResult = await this.authService.validateUser(data);

    if (!loginResult) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return loginResult;
  }

  @Post('register')
  @Public()
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Get('me')
  async getMe(@CurrentUser() user: AuthenticatedUser) {
    const fullUser = await this.userService.findOne(user.id);

    if (!fullUser) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      ...fullUser,
      permissions: ROLE_PERMISSIONS[fullUser.type] ?? [],
    };
  }
}
