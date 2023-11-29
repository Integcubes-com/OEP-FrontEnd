import { TestBed } from '@angular/core/testing';

import { WorkingCalService } from './working-cal.service';

describe('WorkingCalService', () => {
  let service: WorkingCalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingCalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
