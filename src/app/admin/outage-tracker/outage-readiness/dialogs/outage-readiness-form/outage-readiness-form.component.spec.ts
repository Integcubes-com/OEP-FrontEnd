import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageReadinessFormComponent } from './outage-readiness-form.component';

describe('OutageReadinessFormComponent', () => {
  let component: OutageReadinessFormComponent;
  let fixture: ComponentFixture<OutageReadinessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutageReadinessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutageReadinessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
