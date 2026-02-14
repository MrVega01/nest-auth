import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserCreate, UserUpdate } from './interfaces/user.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Post()
  async createUser(@Body() createUserDto: UserCreate) {
    return this.usersService.createUser(createUserDto);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UserUpdate) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
