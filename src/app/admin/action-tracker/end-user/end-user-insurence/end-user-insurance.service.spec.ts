import { TestBed } from '@angular/core/testing';

import { EndUserInsuranceService } from './end-user-insurance.service';

describe('EndUserInsuranceService', () => {
  let service: EndUserInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndUserInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
