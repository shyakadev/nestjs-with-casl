import { UserEntity } from '../common/entity/user.entity';
import { UtilsProvider } from '../providers/utils.provider';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    if (event.entity.password) {
      event.entity.password = await UtilsProvider.generateHash(
        event.entity.password,
      );
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    if (event.entity?.password !== event.databaseEntity.password) {
      event.entity.password = UtilsProvider.generateHash(event.entity.password);
    }
  }
}
