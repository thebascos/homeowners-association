import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'imong mama', // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
