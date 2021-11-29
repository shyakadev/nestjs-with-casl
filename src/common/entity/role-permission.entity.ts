import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'role_permissions' })
export class RolePermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, (roleId) => roleId.id)
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, (permissionId) => permissionId.id)
  permission: PermissionEntity;
}
