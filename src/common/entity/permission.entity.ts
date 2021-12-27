import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectName } from '../constants/object-name';
import { PermissionAction } from '../constants/permission-action';
import { RoleEntity } from './role.entity';

@Entity({ name: 'permisions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PermissionAction })
  action: PermissionAction;

  @Column({ type: 'enum', enum: ObjectName })
  object: ObjectName;

  @ManyToOne(() => RoleEntity, (roleId) => roleId.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: RoleEntity;
}
