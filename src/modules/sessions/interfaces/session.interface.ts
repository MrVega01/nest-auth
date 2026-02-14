import { Session } from '@prisma/client';

export type SessionCreate = Omit<Session, 'id' | 'createdAt' | 'updatedAt'>;
export type SessionUpdate = Partial<SessionCreate>;

export interface GetAllSessions {
  userId: string;
}

export interface GetSessionById {
  id: string;
  userId: string;
}

export interface GetSessionByParams {
  userId: string;
  ip?: string;
  userAgent?: string;
}
