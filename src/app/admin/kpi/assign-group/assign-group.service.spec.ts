import { TestBed } from '@angular/core/testing';

import { AssignGroupService } from './assign-group.service';

describe('AssignGroupService', () => {
  let service: AssignGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
