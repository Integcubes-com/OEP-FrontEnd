import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhaseDescComponent } from './delete-phase-desc.component';

describe('DeletePhaseDescComponent', () => {
  let component: DeletePhaseDescComponent;
  let fixture: ComponentFixture<DeletePhaseDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePhaseDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePhaseDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
