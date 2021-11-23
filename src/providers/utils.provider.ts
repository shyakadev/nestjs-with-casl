import * as bcrypt from 'bcrypt';
import { Optional } from '../types';
export class UtilsProvider {
  static async generateHash(password: string): Promise<string> {
    return await bcrypt.hashSync(password, 10);
  }

  static generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^\dA-Za-z]+/g, '')
      .slice(0, Math.max(0, length));
  }

  static validateHash(
    password: string,
    hash: Optional<string>,
  ): Promise<boolean> {
    if (!password || !hash) {
      return Promise.resolve(false);
    }

    return bcrypt.compare(password, hash);
  }
}
