import { CustomBaseEntity } from '../../custom-base.entity';
import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';
import { PermissionRoleEntity } from './permission-role.entity';

@Entity({ name: 'permission' })
@Unique(['description'])
export class PermissionEntity extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  resource: string;
  @Column()
  description: string;
  @Column()
  path: string;
  @Column('varchar', { default: 'get', length: 20 })
  method: string;
  @Column()
  isDefault: boolean;
  @OneToMany(
    (type) => PermissionRoleEntity,
    (permissionRole) => permissionRole.permission
  )
  @JoinColumn()
  permissionRoles: PermissionRoleEntity[];

  constructor(data?: Partial<PermissionEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
