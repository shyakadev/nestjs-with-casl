import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ObjectName } from '../constants/object-name';
import { PermissionAction } from '../constants/permission-action';

export class PermissionDto {
  @ApiProperty({
    description: 'description of the action property',
    enum: PermissionAction,
  })
  @IsNotEmpty()
  @IsEnum(PermissionAction)
  action: PermissionAction;

  @ApiProperty({
    description: 'description of the object property',
    enum: ObjectName,
  })
  @IsNotEmpty()
  @IsEnum(ObjectName)
  object: ObjectName;
}
