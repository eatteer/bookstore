import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/role.decorators';
import { RegiterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async register(registerUserDto: RegiterUserDto) {
    const user = new User();
    user.username = registerUserDto.username;
    user.email = registerUserDto.email;
    user.password = registerUserDto.password;
    user.role = Role.Client;
    await this.usersRepository.insert(user);
  }
}
