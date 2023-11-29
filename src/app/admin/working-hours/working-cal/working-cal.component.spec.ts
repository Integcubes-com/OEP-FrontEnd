import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCalComponent } from './working-cal.component';

describe('WorkingCalComponent', () => {
  let component: WorkingCalComponent;
  let fixture: ComponentFixture<WorkingCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingCalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
