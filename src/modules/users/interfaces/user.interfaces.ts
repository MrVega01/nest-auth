import { User } from '@prisma/client';

export type UserCreate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdate = Partial<UserCreate>;
