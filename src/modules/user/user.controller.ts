import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectName } from '../../common/constants/object-name';
import { PermissionAction } from '../../common/constants/permission-action';
import { CheckPermissions } from '../../decorators/check-permissions.decorator';
import { PermissionEntity } from '../../common/entity/permission.entity';
import { UserEntity } from '../../common/entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @CheckPermissions([PermissionAction.Read, ObjectName.user])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users List',
  })
  async getUsers(): Promise<[UserEntity[], number]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @CheckPermissions([PermissionAction.Read, ObjectName.user])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user Details',
  })
  async getUser(@Param('id') userId: string): Promise<UserEntity> {
    return await this.userService.getUser(userId);
  }

  @Get('permission/:id')
  @CheckPermissions(
    [PermissionAction.Read, ObjectName.permission],
    [PermissionAction.Manage, ObjectName.all],
  )
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User permissions',
  })
  async findAllPermissionsOfUser(
    @Param('id') userId: string,
  ): Promise<PermissionEntity[]> {
    const user = await this.userService.getUser(userId);
    return await this.userService.findAllPermissionsOfUser(user.role.id);
  }
}
