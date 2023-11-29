import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhaseFormComponent } from './add-phase-form.component';

describe('AddPhaseFormComponent', () => {
  let component: AddPhaseFormComponent;
  let fixture: ComponentFixture<AddPhaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
