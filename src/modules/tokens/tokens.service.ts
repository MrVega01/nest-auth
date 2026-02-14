import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateToken,
  DatabaseToken,
  RevokeToken,
} from './interfaces/tokens.interface';
import { AuthTokenType } from 'src/common/enums/authToken';

@Injectable()
export class TokensService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private readonly randomToken = () =>
    Math.random().toString(36).substring(2, 15);
  private readonly getKey = (type: AuthTokenType, userId: string) =>
    `token:${type}:${userId}`;

  async createToken(token: CreateToken) {
    const tokenValue = this.randomToken();
    const databaseToken = {
      token: tokenValue,
      userId: token.userId,
      type: token.type,
    };
    await this.cacheManager.set(
      this.getKey(token.type, token.userId),
      databaseToken,
      token.ttl || 900000,
    );
  }

  async validateToken({ token, type, userId }: DatabaseToken) {
    const key = this.getKey(type, userId);
    const cachedToken = await this.cacheManager.get<DatabaseToken>(key);
    if (cachedToken && cachedToken.token === token) {
      await this.cacheManager.del(key); // Invalidate token after use
      return cachedToken;
    }
    throw new UnauthorizedException('Invalid or expired token');
  }

  async revokeToken({ type, userId }: RevokeToken) {
    await this.cacheManager.del(this.getKey(type, userId));
  }
}
