import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { UserEntity } from '../entity/user.entity';

export class UserDto extends BaseDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: number;

  @ApiProperty()
  roleName: string;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role.id;
    this.roleName = user.role.name;
  }
}
