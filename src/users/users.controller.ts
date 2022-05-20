import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/roles.decorators';

import { RegiterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersControllers {
  constructor(private usersServices: UsersService) {}

  @Get('existence')
  async determineExistence(@Query() query: any) {
    if (query.username) {
      try {
        const user = await this.usersServices.findByUsername(query.username);
        return Boolean(user);
      } catch (error) {
        console.error(error);
      }
    }

    if (query.email) {
      try {
        const user = await this.usersServices.findByEmail(query.email);
        return Boolean(user);
      } catch (error) {
        console.error(error);
      }
    }
  }

  @Post('client')
  async registerClient(@Body() registerUserDto: RegiterUserDto) {
    try {
      await this.usersServices.register(registerUserDto, Role.Client);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('admin')
  async registerAdmin(@Body() registerUserDto: RegiterUserDto) {
    try {
      return await this.usersServices.register(registerUserDto, Role.Admin);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
