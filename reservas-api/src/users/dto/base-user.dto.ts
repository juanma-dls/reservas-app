import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({ example: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Lastname' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'newUser@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'CUSTOMER',
    enum: ['ADMIN', 'CUSTOMER', 'USER'],
  })
  @IsNotEmpty()
  type: 'ADMIN' | 'CUSTOMER' | 'USER';
}
