import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserEntity } from '../../../common/entity/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.jwtSecret,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      id: payload.id,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
