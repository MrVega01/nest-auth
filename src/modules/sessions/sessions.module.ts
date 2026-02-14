import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [SessionsService],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
