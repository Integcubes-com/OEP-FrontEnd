import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageReadinessComponent } from './outage-readiness.component';

describe('OutageReadinessComponent', () => {
  let component: OutageReadinessComponent;
  let fixture: ComponentFixture<OutageReadinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutageReadinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutageReadinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
