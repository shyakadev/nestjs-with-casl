import { RoleType } from '../../common/constants/role-type';
import { TicketCategory } from '../../common/constants/ticket-category';
import { Column, Entity } from 'typeorm';
import { UseDto } from '../../decorators/use-dto.decorator';
import { UserDto } from './dto/user-dto';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends BaseEntity<UserDto> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.STAFF })
  roleType: RoleType;

  @Column({ type: 'enum', enum: TicketCategory })
  ticketCategory: TicketCategory;
}
