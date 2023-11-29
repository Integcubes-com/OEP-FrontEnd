import { TestBed } from '@angular/core/testing';

import { NextOutagesService } from './next-outages.service';

describe('NextOutagesService', () => {
  let service: NextOutagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextOutagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
