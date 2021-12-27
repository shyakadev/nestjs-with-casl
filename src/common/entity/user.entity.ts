import { TicketCategory } from '../constants/ticket-category';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDto } from '../../decorators/use-dto.decorator';
import { UserDto } from '../../modules/user/dto/user-dto';
import { BaseEntity } from './common/base.entity';
import { RoleEntity } from './role.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends BaseEntity<UserDto> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.id, { nullable: false })
  @JoinColumn()
  role: RoleEntity;

  @Column({ type: 'enum', enum: TicketCategory })
  ticketCategory: TicketCategory;
}
