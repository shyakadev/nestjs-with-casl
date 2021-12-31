import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserRegisterDto } from '../../common/dto/user-register.dto';
import { UserEntity } from '../../common/entity/user.entity';
import { UserRepository } from './user.repository';
import { RolePermissionService } from '../role-permission/role-permission.service';
import { PermissionEntity } from '../../common/entity/permission.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private rolePermissionService: RolePermissionService,
  ) {}

  findOne(conditions: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: conditions,
      relations: ['role'],
    });
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
    const user = await this.findOne({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(userRegisterDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Unique key violation ' + error,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async findAllPermissionsOfUser(roleId: number): Promise<PermissionEntity[]> {
    return await this.rolePermissionService.getRolePermissions(roleId);
  }
}
