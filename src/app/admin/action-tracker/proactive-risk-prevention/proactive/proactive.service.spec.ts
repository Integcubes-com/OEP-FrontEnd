import { TestBed } from '@angular/core/testing';

import { ProactiveService } from './proactive.service';

describe('ProactiveService', () => {
  let service: ProactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
