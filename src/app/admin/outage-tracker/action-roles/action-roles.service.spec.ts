import { TestBed } from '@angular/core/testing';

import { ActionRolesService } from './action-roles.service';

describe('ActionRolesService', () => {
  let service: ActionRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
