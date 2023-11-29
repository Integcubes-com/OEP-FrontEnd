import { TestBed } from '@angular/core/testing';

import { OutageReadinessService } from './outage-readiness.service';

describe('OutageReadinessService', () => {
  let service: OutageReadinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutageReadinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
