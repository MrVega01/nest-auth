import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  providers: [UsersService, PrismaService, BcryptService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
