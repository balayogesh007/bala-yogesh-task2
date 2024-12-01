import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: 'rsa',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    let isExpiredToken = false;
    const seconds = 1000;
    const date = new Date();
    const time = date.getTime();
    if (payload.exp < Math.round(time / seconds)) {
      isExpiredToken = true;
    }
    if (isExpiredToken) {
      //token expire check
      throw new UnauthorizedException('Token Expired');
    }

    //validate user by verify the email
    console.log("UserSer", this.userService)
    const user: User = await this.userService.validateUser(payload);
    if (!user?.id) {
      throw new UnauthorizedException('Invalid Token');
    }
    return user; //user will be added to context. This name should be same in decorator. Can be accessed from request
  }
}
