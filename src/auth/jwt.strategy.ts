import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { Payload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /* Strategy configuration */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  /* Callback provided by the strategy that automatically extract the bearer token and decode it */
  async validate(payload: Payload) {
    /* Inject object into request as user */
    return { id: payload.sub, role: payload.role };
  }
}
