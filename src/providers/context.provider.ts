import requestContext from 'request-context';
import { UserEntity } from '../modules/user/user.entity';

export class ContextProvider {
  private static readonly nameSpace = 'request';
  private static readonly authUserKey = 'user_key';

  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }

  private static set(key: string, value: any): void {
    requestContext.set(ContextProvider.getKeyWithNamespace(key), value);
  }

  private static get<T>(key: string): T {
    return requestContext.get(ContextProvider.getKeyWithNamespace(key));
  }

  static setAuthUser(user: UserEntity): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }

  static getAuthUser(): UserEntity {
    return ContextProvider.get(ContextProvider.authUserKey);
  }
}
