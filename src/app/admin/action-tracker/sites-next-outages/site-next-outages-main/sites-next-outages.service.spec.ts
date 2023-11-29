import { TestBed } from '@angular/core/testing';

import { SitesNextOutagesService } from './sites-next-outages.service';

describe('SitesNextOutagesService', () => {
  let service: SitesNextOutagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitesNextOutagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
