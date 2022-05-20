import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/roles.decorators';
import { RegiterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  async register(registerUserDto: RegiterUserDto, role: Role) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);
    const user = new User();
    user.username = registerUserDto.username;
    user.email = registerUserDto.email;
    user.password = hash;
    user.role = role;
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }
}
