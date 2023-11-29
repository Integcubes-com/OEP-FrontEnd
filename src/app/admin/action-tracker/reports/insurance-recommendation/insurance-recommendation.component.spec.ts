import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRecommendationComponent } from './insurance-recommendation.component';

describe('InsuranceRecommendationComponent', () => {
  let component: InsuranceRecommendationComponent;
  let fixture: ComponentFixture<InsuranceRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
