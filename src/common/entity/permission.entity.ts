import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionAction } from '../constants/permission-action';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'permisions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PermissionAction })
  action: PermissionAction;

  @ManyToOne(() => ObjectEntity, (objectId) => objectId.id)
  object: ObjectEntity;
}
