import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteObservationComponent } from './delete-observation.component';

describe('DeleteObservationComponent', () => {
  let component: DeleteObservationComponent;
  let fixture: ComponentFixture<DeleteObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteObservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
