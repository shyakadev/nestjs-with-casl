import { PermissionEntity } from '../../common/entity/permission.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PermissionEntity)
export class PermissionRepository extends Repository<PermissionEntity> {}
