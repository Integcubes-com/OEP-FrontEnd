import { TestBed } from '@angular/core/testing';

import { PocAccessService } from './poc-access.service';

describe('InsuranceAccessService', () => {
  let service: PocAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
