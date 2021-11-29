import { ApiProperty } from '@nestjs/swagger';
import { PermissionAction } from '../../../common/constants/permission-action';

export class PermissionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  objectId: number;

  @ApiProperty()
  action: PermissionAction;

  @ApiProperty()
  name: string;
}
