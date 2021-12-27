import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from '../../common/dto/role.dto';
import { CheckPermissions } from '../../decorators/check-permissions.decorator';
import { RoleEntity } from '../../common/entity/role.entity';
import { RolePermissionService } from './role-permission.service';
import { PermissionAction } from '../../common/constants/permission-action';
import { ObjectName } from '../../common/constants/object-name';
import { PermissionEntity } from '../../common/entity/permission.entity';
import { PermissionDto } from '../../common/dto/permission.dto';

@Controller('role-permission')
@ApiTags('role-permission')
export class RolePermissionController {
  constructor(private rolePermission: RolePermissionService) {}

  @Get()
  @CheckPermissions([PermissionAction.Read, ObjectName.role])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Roles',
  })
  async getRoles(): Promise<[RoleEntity[], number]> {
    return await this.rolePermission.getRoles();
  }

  @Get(':id')
  @CheckPermissions([PermissionAction.Read, ObjectName.role])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get permissions of a Role',
  })
  async getRolePermissions(@Param('id') id: number) {
    return await this.rolePermission.getRolePermissions(id);
  }

  @Post()
  @CheckPermissions([PermissionAction.Create, ObjectName.role])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: RoleEntity,
    status: HttpStatus.CREATED,
    description: 'Create a role',
  })
  async createRole(@Body() roleDto: RoleDto): Promise<RoleEntity> {
    return await this.rolePermission.createRole(roleDto);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: PermissionEntity,
    status: HttpStatus.CREATED,
    description: "Create role's permissions",
  })
  async createRolePermissions(
    @Param('id') id: number,
    @Body() permissionDto: PermissionDto[],
  ): Promise<PermissionDto[]> {
    const role = await this.rolePermission.getRole(id);
    if (role) {
      return await this.rolePermission.createRolePermissions(
        permissionDto,
        role.id,
      );
    }

    throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
  }
}
