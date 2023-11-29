import { TestBed } from '@angular/core/testing';

import { LatestStatusService } from './latest-status.service';

describe('LatestStatusService', () => {
  let service: LatestStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
