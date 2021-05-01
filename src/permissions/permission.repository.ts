import { EntityRepository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { BaseRepository } from '../common/repository/base.repository';
import { Permission } from './serializer/permission.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(PermissionEntity)
export class PermissionRepository extends BaseRepository<
  PermissionEntity,
  Permission
> {
  transform(model: PermissionEntity, transformOption = {}): Permission {
    return plainToClass(
      Permission,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: PermissionEntity[],
    transformOption = {}
  ): Permission[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
