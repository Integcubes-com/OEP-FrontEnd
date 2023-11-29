import { TestBed } from '@angular/core/testing';

import { AddProgramService } from './add-program.service';

describe('AddProgramService', () => {
  let service: AddProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
