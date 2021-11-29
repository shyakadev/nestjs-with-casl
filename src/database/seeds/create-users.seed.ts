import { UserEntity } from '../../common/entity/user.entity';
import type { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserEntity)().createMany(3);
  }
}
