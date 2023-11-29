import { TestBed } from '@angular/core/testing';

import { AddMitigationService } from './add-mitigation.service';

describe('AddMitigationService', () => {
  let service: AddMitigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMitigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
