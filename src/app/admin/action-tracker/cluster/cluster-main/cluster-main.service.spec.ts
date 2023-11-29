import { TestBed } from '@angular/core/testing';

import { ClusterMainService } from './cluster-main.service';

describe('ClusterMainService', () => {
  let service: ClusterMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClusterMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
