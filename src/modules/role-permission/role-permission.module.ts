import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository, PermissionRepository])],
  providers: [RolePermissionService],
  controllers: [RolePermissionController],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
