import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInsuranceComponent } from './review-insurance.component';

describe('ReviewInsuranceComponent', () => {
  let component: ReviewInsuranceComponent;
  let fixture: ComponentFixture<ReviewInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
