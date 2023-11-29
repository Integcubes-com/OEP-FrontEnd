import { TestBed } from '@angular/core/testing';

import { MonthlyKpiService } from './monthly-kpi.service';

describe('MonthlyKpiService', () => {
  let service: MonthlyKpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyKpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
