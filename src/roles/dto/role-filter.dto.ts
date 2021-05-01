import { IsString, Min, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RoleFilterDto {
  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @Transform(({ value }) => Number.parseInt(value), { toClassOnly: true })
  @Min(1)
  limit: number;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @Transform(({ value }) => Number.parseInt(value), { toClassOnly: true })
  @Min(1)
  page: number;
}
