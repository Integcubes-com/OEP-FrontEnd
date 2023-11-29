import { TestBed } from '@angular/core/testing';

import { SiteEquipmentsService } from './site-equipments.service';

describe('SiteEquipmentsService', () => {
  let service: SiteEquipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteEquipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
