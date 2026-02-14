import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  GetAllSessions,
  GetSessionById,
  SessionCreate,
  SessionUpdate,
} from './interfaces/session.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSessionsById({ userId }: GetAllSessions) {
    return this.prismaService.session.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        userAgent: true,
        createdAt: true,
        lastUsedAt: true,
      },
    });
  }

  async getSessionById({ id, userId }: GetSessionById) {
    return this.prismaService.session.findFirst({
      where: { id, userId },
      select: {
        id: true,
        userId: true,
        userAgent: true,
        createdAt: true,
        lastUsedAt: true,
      },
    });
  }

  async createSession(session: SessionCreate) {
    return this.prismaService.session.create({ data: session });
  }

  async updateSessionById(id: string, session: SessionUpdate) {
    return this.prismaService.session.update({
      where: { id },
      data: session,
    });
  }

  async deleteSessionById(id: string) {
    try {
      await this.prismaService.session.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new BadRequestException('Session not found');
      }
    }
  }

  async deleteSessionsByUserId(userId: string) {
    try {
      await this.prismaService.session.deleteMany({ where: { userId } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new BadRequestException('Sessions not found');
      }
    }
  }
}
