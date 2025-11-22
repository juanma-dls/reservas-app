import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
}
