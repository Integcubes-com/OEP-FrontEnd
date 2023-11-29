import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyKpiComponent } from './monthly-kpi.component';

describe('MonthlyKpiComponent', () => {
  let component: MonthlyKpiComponent;
  let fixture: ComponentFixture<MonthlyKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyKpiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
