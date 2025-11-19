import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'newUser@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'CUSTOMER', enum: ['ADMIN', 'CUSTOMER'] })
  @IsNotEmpty()
  readonly type: 'ADMIN' | 'CUSTOMER';
}
