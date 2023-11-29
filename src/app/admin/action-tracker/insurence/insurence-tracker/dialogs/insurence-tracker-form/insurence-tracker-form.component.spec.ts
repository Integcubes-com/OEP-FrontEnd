import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurenceTrackerFormComponent } from './insurence-tracker-form.component';

describe('InsurenceTrackerFormComponent', () => {
  let component: InsurenceTrackerFormComponent;
  let fixture: ComponentFixture<InsurenceTrackerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurenceTrackerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurenceTrackerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
