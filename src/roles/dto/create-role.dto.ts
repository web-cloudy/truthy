import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ValidateIf((object, value) => value)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  group: string;

  @IsOptional()
  isDefault: boolean;

  @IsOptional()
  isSystem: boolean;
}
