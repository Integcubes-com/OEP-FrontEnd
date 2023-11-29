import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProgramFormComponent } from './delete-program-form.component';

describe('DeleteProgramFormComponent', () => {
  let component: DeleteProgramFormComponent;
  let fixture: ComponentFixture<DeleteProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProgramFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
