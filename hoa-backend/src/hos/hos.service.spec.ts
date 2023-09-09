import { Test, TestingModule } from '@nestjs/testing';
import { HosService } from './hos.service';

describe('HosService', () => {
  let service: HosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HosService],
    }).compile();

    service = module.get<HosService>(HosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
