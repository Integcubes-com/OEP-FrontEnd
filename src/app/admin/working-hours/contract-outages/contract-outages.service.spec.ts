import { TestBed } from '@angular/core/testing';

import { ContractOutagesService } from './contract-outages.service';

describe('ContractOutagesService', () => {
  let service: ContractOutagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractOutagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
