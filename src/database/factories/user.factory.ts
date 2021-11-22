import { define } from 'typeorm-seeding';
import { RoleType } from '../../common/constants/role-type';
import { UserEntity } from '../../modules/user/user.entity';

define(UserEntity, (faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);

  const user = new UserEntity();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.roleType = RoleType.STAFF;
  user.password = '12345678';

  return user;
});
