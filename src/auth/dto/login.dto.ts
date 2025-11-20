import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin_user@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'passwordSegura123', required: true })
  @IsString()
  password: string;
}
