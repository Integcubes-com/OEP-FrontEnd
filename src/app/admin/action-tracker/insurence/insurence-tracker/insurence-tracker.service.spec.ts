import { TestBed } from '@angular/core/testing';

import { InsurenceTrackerService } from './insurence-tracker.service';

describe('InsurenceTrackerService', () => {
  let service: InsurenceTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurenceTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
