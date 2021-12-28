import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PermissionDto } from '../../common/dto/permission.dto';
import { RoleDto } from '../../common/dto/role.dto';
import { PermissionEntity } from '../../common/entity/permission.entity';
import { RoleEntity } from '../../common/entity/role.entity';
import { PermissionRepository } from './permission.repository';
import { RoleRepository } from './role.repository';

@Injectable()
export class RolePermissionService {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  async getRoles(): Promise<[RoleEntity[], number]> {
    return await this.roleRepository.findAndCount();
  }

  async getRole(roleId: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne(roleId);
  }

  async createRole(roleDto: RoleDto): Promise<RoleEntity> {
    try {
      const role = this.roleRepository.create(roleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Unique key violation ' + error,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async getRolePermissions(roleId: number): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find({ where: { role: roleId } });
  }

  async createRolePermissions(
    permissionsDto: PermissionDto[],
    roleId,
  ): Promise<PermissionDto[]> {
    permissionsDto.map(async (permission) => {
      const permissionEntity = this.permissionRepository.create({
        ...permission,
        role: roleId,
      });

      (await this.permissionExist(permissionEntity))
        ? ''
        : this.permissionRepository.save(permissionEntity);
    });
    return permissionsDto;
  }

  async permissionExist(permissionEntity: PermissionEntity): Promise<boolean> {
    const permission = await this.permissionRepository.find({
      where: {
        role: permissionEntity.role,
        action: permissionEntity.action,
        object: permissionEntity.object,
      },
    });

    return permission.length > 0 ? true : false;
  }
}
