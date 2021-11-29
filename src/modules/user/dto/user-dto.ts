import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TicketCategory } from '../../../common/constants/ticket-category';
import { BaseDto } from '../../../common/dto/base.dto';
import { UserEntity } from '../../../common/entity/user.entity';

export class UserDto extends BaseDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ enum: TicketCategory })
  ticketCategory: TicketCategory;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
