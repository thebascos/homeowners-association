import { Module } from '@nestjs/common';
import { HosController } from './hos.controller';
import { HosService } from './hos.service';

@Module({
  controllers: [HosController],
  providers: [HosService],
})
export class HosModule {}
