import { TestBed } from '@angular/core/testing';

import { TilsTrackerService } from './tils-tracker.service';

describe('TilsTrackerService', () => {
  let service: TilsTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilsTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
