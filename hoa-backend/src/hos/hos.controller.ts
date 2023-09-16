import { Controller, Get, Param } from '@nestjs/common';

@Controller('hos')
export class HosController {
  @Get('/:id')
  getho(@Param('id') id: string): string {
    if (id === '90348589347895789347587e4') {
      return 'princh buang';
    }
  }
}
