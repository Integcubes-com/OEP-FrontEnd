import { TestBed } from '@angular/core/testing';

import { TilEvaluationService } from './til-evaluation.service';

describe('TilEvaluationService', () => {
  let service: TilEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
