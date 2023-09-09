import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HosModule } from './hos/hos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, HosModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
