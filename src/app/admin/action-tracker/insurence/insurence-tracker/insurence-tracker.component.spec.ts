import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurenceTrackerComponent } from './insurence-tracker.component';

describe('InsurenceTrackerComponent', () => {
  let component: InsurenceTrackerComponent;
  let fixture: ComponentFixture<InsurenceTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurenceTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurenceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
