import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({ example: 'Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Lastname' })
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty({ example: 'newUser@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  readonly password: string;
}
