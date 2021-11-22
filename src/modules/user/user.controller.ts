import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('admin')
  @HttpCode(HttpStatus.OK)
  async admin(user: UserEntity): Promise<string> {
    return user.firstName;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users List',
  })
  getUsers(): Promise<[UserEntity[], number]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user Details',
  })
  getUser(@Param('id') userId: string): Promise<UserEntity> {
    return this.userService.getUser(userId);
  }
}