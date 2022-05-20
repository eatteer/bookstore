import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Payload } from './payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      /* Inject object into request as user */
      return isMatch ? user : null;
    }
    return null;
  }

  login(user: User) {
    const payload: Payload = {
      sub: user.id,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      username: user.username,
    };
  }
}
