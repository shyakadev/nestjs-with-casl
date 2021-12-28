import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, PermissionObjectType } from '../../../types';
import { PermissionAction } from '../../../common/constants/permission-action';
import { UserDto } from '../../../common/dto/user-dto';
import { PermissionEntity } from '../../../common/entity/permission.entity';
import { UserService } from '../../../modules/user/user.service';

interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private userService: UserService) {}

  async createForUser(user: UserDto): Promise<AppAbility> {
    const dbPermissions: PermissionEntity[] =
      await this.userService.findAllPermissionsOfUser(user.role);
    const caslPermissions: CaslPermission[] = dbPermissions.map(
      (permission) => ({
        action: permission.action,
        subject: permission.object,
      }),
    );
    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
