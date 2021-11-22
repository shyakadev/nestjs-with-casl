import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TicketCategory } from '../../../common/constants/ticket-category';
import { RoleType } from '../../../common/constants/role-type';
import { BaseDto } from '../../../common/dto/base.dto';
import { UserEntity } from '../user.entity';

export class UserDto extends BaseDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ enum: RoleType })
  roleType: RoleType;

  @ApiPropertyOptional({ enum: TicketCategory })
  ticketCategory: TicketCategory;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.roleType = user.roleType;
  }
}
