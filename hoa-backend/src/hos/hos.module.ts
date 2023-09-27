import { Module } from '@nestjs/common';
import { HosController } from './hos.controller';
import { HosService } from './hos.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HosController],
  providers: [HosService],
})
export class HosModule {}
