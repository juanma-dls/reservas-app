import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(BaseUserDto, ['email'] as const),
) {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  newPassword?: string;
}
