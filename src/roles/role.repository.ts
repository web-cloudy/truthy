import { EntityRepository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleSerializer } from './serializer/role.serializer';
import { classToPlain, plainToClass } from 'class-transformer';
import { BaseRepository } from '../common/repository/base.repository';

@EntityRepository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity, RoleSerializer> {
  /**
   * transform single role
   * @param model
   * @param transformOption
   */
  transform(model: RoleEntity, transformOption = {}): RoleSerializer {
    return plainToClass(
      RoleSerializer,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  /**
   * transform array of roles
   * @param models
   */
  transformMany(models: RoleEntity[]): RoleSerializer[] {
    return models.map((model) => this.transform(model));
  }
}
