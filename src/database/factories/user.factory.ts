import { define } from 'typeorm-seeding';
import { UserEntity } from '../../common/entity/user.entity';

define(UserEntity, (faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);

  const user = new UserEntity();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = '12345678';

  return user;
});
