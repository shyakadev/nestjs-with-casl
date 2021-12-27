import { RoleEntity } from '../../common/entity/role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
