import { TestBed } from '@angular/core/testing';

import { VoltifyService } from './voltify.service';

describe('VoltifyService', () => {
  let service: VoltifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoltifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
