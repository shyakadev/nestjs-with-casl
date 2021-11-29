import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.authConfig.jwtSecret,
        signOptions: {
          expiresIn: `${configService.authConfig.jwtExpirationTime}s`,
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, CaslAbilityFactory, PermissionsGuard],
  controllers: [AuthController],
  exports: [JwtModule, AuthService, CaslAbilityFactory, PermissionsGuard],
})
export class AuthModule {}
