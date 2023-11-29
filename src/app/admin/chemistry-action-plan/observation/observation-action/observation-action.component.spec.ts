import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationActionComponent } from './observation-action.component';

describe('ObservationActionComponent', () => {
  let component: ObservationActionComponent;
  let fixture: ComponentFixture<ObservationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
