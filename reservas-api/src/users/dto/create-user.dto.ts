import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  password: string;
}
