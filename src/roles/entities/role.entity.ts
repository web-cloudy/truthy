import { CustomBaseEntity } from '../../custom-base.entity';
import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';
import { PermissionRoleEntity } from '../../permissions/entities/permission-role.entity';

@Entity({ name: 'role' })
@Unique(['name'])
export class RoleEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(
    (type) => PermissionRoleEntity,
    (permissionRole) => permissionRole.role
  )
  @JoinColumn()
  permissionRoles: PermissionRoleEntity[];

  constructor(data?: Partial<RoleEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
