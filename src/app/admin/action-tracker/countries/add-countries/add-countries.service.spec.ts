import { TestBed } from '@angular/core/testing';

import { AddCountriesService } from './add-countries.service';

describe('AddCountriesService', () => {
  let service: AddCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
