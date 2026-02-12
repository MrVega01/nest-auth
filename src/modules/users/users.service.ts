import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreate, UserUpdate } from './interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async createUser(data: UserCreate) {
    return this.prismaService.user.create({ data });
  }

  async updateUser(id: string, data: UserUpdate) {
    return this.prismaService.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
