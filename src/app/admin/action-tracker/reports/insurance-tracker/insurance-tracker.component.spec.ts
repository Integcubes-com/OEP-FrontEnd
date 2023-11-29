import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTrackerComponent } from './insurance-tracker.component';

describe('InsuranceTrackerComponent', () => {
  let component: InsuranceTrackerComponent;
  let fixture: ComponentFixture<InsuranceTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
