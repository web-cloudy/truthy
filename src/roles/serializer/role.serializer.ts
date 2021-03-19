import { Expose } from 'class-transformer';
import { ModelSerializer } from '../../common/serializer/model.serializer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const adminUserGroupsForSerializing: string[] = ['admin'];

export class RoleSerializer extends ModelSerializer {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  @Expose({ groups: adminUserGroupsForSerializing })
  description: string;
}
