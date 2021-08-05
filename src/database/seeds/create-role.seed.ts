import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { PermissionConfiguration } from '../../config/permission-config';
import { PermissionEntity } from '../../permissions/entities/permission.entity';

export default class CreateRoleSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const roles = PermissionConfiguration.roles;
    await connection.createQueryBuilder().insert().into(RoleEntity).values(roles).orIgnore().execute();

    // Assign all permission to superUser
    const role = await connection
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .where('role.name = :name', {
        name: 'superuser',
      })
      .getOne();

    if (role) {
      role.permission = await connection.getRepository(PermissionEntity).createQueryBuilder('permission').getMany();
      await role.save();
    }
  }
}
