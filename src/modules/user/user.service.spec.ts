import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterDto } from '../../common/dto/user-register.dto';
import { PermissionRepository } from '../role-permission/permission.repository';
import { RolePermissionService } from '../role-permission/role-permission.service';
import { RoleRepository } from '../role-permission/role.repository';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const user = {
    id: '5a5c51f4-5d22-49b5-bc6c-2932667cee8b',
    createdAt: '2021-11-29T12:03:33.638Z',
    updatedAt: '2021-12-06T12:18:46.768Z',
    firstName: 'Tresor',
    lastName: 'Shyaka',
    email: 'tresor.shyaka@gmail.com',
    role: {
      id: 1,
      name: 'admin',
    },
  };
  const queryBuilder = {
    orWhere: jest.fn(),
    getOne: jest.fn().mockResolvedValue(user),
  };

  const userRegisterDto: UserRegisterDto = {
    firstName: 'Tresor',
    lastName: 'Shyaka',
    email: 'tresor.shyaka@gmail.com',
    password: 'password',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        RolePermissionService,
        RoleRepository,
        PermissionRepository,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
            createQueryBuilder: jest.fn(() => queryBuilder),
            findAndCount: jest.fn().mockResolvedValue([user]),
            create: jest.fn(() => userRegisterDto),
            save: jest.fn().mockResolvedValue(userRegisterDto),
          },
        },
      ],
    }).compile();

    userService = await moduleRef.get<UserService>(UserService);
    userRepository = await moduleRef.get<UserRepository>(UserRepository);
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('getUser should return user with assigned role', async () => {
    const repoSpy = jest.spyOn(userRepository, 'findOne');
    await expect(
      userService.getUser('5a5c51f4-5d22-49b5-bc6c-2932667cee8b'),
    ).resolves.toEqual(user);

    expect(repoSpy).toBeCalledWith({
      where: { id: '5a5c51f4-5d22-49b5-bc6c-2932667cee8b' },
      relations: ['role'],
    });
  });

  it("getUser should throw user not found if user doesn't exist", async () => {
    userRepository.findOne = jest.fn().mockReturnValue(undefined);
    await expect(userService.getUser('xxx')).rejects.toThrowError(
      'User not found',
    );
  });

  it('getUsers should return all users', async () => {
    const users = await userService.getUsers();
    expect(users).toEqual([user]);
  });

  it('findByUsernameOrEmail should return user from provided username or email', async () => {
    const repoSpy = jest.spyOn(userRepository, 'createQueryBuilder');

    await expect(
      userService.findByUsernameOrEmail({ email: 'tresor.shyaka@gmail.com' }),
    ).resolves.toEqual(user);

    expect(repoSpy).toBeCalledWith('user');
  });

  it('createUser should save user and return registered user', async () => {
    const repoSpy = jest.spyOn(userRepository, 'save');

    await expect(userService.createUser(userRegisterDto)).resolves.toEqual(
      userRegisterDto,
    );

    expect(repoSpy).toBeCalledWith(userRegisterDto);
  });
});
