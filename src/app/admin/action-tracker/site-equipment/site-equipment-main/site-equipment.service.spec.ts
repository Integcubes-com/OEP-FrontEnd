import { TestBed } from '@angular/core/testing';

import { SiteEquipmentService } from './site-equipment.service';

describe('SiteEquipmentService', () => {
  let service: SiteEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
