import { Test, TestingModule } from '@nestjs/testing';
import { HosController } from './hos.controller';

describe('HosController', () => {
  let controller: HosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HosController],
    }).compile();

    controller = module.get<HosController>(HosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
