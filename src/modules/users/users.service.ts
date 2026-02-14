import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreate, UserUpdate } from './interfaces/user.interfaces';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  private async validateEmail(email: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
  }

  async findUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(data: UserCreate) {
    await this.validateEmail(data.email);

    const hashedPassword = data.password
      ? await this.bcryptService.hash(data.password)
      : undefined;
    return this.prismaService.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async updateUser(id: string, data: UserUpdate) {
    if (data.email) {
      await this.validateEmail(data.email);
    }

    const hashedPassword = data.password
      ? await this.bcryptService.hash(data.password)
      : undefined;
    return this.prismaService.user.update({
      where: { id },
      data: { ...data, password: hashedPassword },
    });
  }

  async deleteUser(id: string) {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }
}
