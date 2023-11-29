import { TestBed } from '@angular/core/testing';

import { ObervationService } from './obervation.service';

describe('ObervationService', () => {
  let service: ObervationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObervationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
