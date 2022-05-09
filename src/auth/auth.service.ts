import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Payload } from './payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      /* Inject object into request as user */
      return user;
    }
    return null;
  }

  login(user: User) {
    const payload: Payload = {
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      username: user.username,
      role: user.role,
    };
  }
}
