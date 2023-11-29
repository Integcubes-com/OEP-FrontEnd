import { TestBed } from '@angular/core/testing';

import { AddInsurenceService } from './add-insurence.service';

describe('AddInsurenceService', () => {
  let service: AddInsurenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInsurenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
