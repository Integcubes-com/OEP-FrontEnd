import { TestBed } from '@angular/core/testing';

import { TrackOutagesService } from './track-outages.service';

describe('TrackOutagesService', () => {
  let service: TrackOutagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackOutagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
