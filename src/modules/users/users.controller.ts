import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserCreate } from './interfaces/user.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: UserCreate) {
    return this.usersService.createUser(createUserDto);
  }
}
