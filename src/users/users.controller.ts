import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

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

  @Post()
  @HttpCode(201)
  async register(@Body() registerUserDto: RegiterUserDto) {
    try {
      await this.usersServices.register(registerUserDto);
    } catch (error) {
      console.error(error);
    }
  }
}
