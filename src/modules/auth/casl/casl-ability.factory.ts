import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, PermissionObjectType } from '../../../types';
import { PermissionAction } from '../../../common/constants/permission-action';
import { UserEntity } from '../../../common/entity/user.entity';
import { AuthService } from '../auth.service';
import { PermissionDto } from '../dto/permission.dto';

interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}

  async createForUser(user: UserEntity): Promise<AppAbility> {
    const dbPermissions: PermissionDto[] =
      await this.authService.findAllPermissionsOfUser(user.id);
    const caslPermissions: CaslPermission[] = dbPermissions.map(
      (permission) => ({
        action: permission.action,
        subject: permission.name,
      }),
    );
    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
