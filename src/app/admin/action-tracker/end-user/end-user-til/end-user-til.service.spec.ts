import { TestBed } from '@angular/core/testing';

import { EndUserTilService } from './end-user-til.service';

describe('EndUserTilService', () => {
  let service: EndUserTilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndUserTilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
