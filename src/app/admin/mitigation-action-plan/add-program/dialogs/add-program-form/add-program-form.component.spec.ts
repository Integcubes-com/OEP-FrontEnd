import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramFormComponent } from './add-program-form.component';

describe('AddProgramFormComponent', () => {
  let component: AddProgramFormComponent;
  let fixture: ComponentFixture<AddProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
