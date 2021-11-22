import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(public userRepository: UserRepository) {}

  findOne(conditions: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(conditions);
  }

  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (options.username) {
      queryBuilder.orWhere('user.username == :username', {
        username: options.username,
      });
    }

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }

    return queryBuilder.getOne();
  }

  async getUsers(): Promise<[UserEntity[], number]> {
    const users = await this.userRepository.findAndCount();
    return users;
  }

  async getUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);
    return this.userRepository.save(user);
  }
}
