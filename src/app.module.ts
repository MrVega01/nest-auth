import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { PrismaModule } from './modules/prisma/prisma.module';
import { envConfig } from './config/envs';
import { UsersModule } from './modules/users/users.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { EmailsModule } from './modules/emails/emails.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          ttl: 5000, // Cache TTL in seconds
          stores: [new KeyvRedis(envConfig.REDIS_URL)],
        };
      },
    }),
    PrismaModule,
    UsersModule,
    BcryptModule,
    SessionsModule,
    TokensModule,
    EmailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
