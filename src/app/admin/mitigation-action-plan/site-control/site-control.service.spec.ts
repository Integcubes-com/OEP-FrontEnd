import { TestBed } from '@angular/core/testing';

import { SiteControlService } from './site-control.service';

describe('SiteControlService', () => {
  let service: SiteControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
