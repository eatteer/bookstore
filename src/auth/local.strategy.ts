import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /* Passport local strategy extracts username and password from body request */
  /*
  {
    "username": "Deviluke",
    "password": "lovewony"
  }
  */
  /* Callback provided by the strategy */
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    /* Inject object into request as user */
    return user;
  }
}
