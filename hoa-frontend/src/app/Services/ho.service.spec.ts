import { TestBed } from '@angular/core/testing';

import { HoService } from './ho.service';

describe('HoService', () => {
  let service: HoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
