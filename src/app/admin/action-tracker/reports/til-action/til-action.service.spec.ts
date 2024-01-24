import { TestBed } from '@angular/core/testing';

import { TilActionService } from './til-action.service';

describe('TilActionService', () => {
  let service: TilActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
