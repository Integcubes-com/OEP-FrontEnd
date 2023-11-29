import { TestBed } from '@angular/core/testing';

import { AddTilsService } from './add-tils.service';

describe('AddTilsService', () => {
  let service: AddTilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
