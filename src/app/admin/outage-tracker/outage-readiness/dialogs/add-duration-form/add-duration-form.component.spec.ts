import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDurationFormComponent } from './add-duration-form.component';

describe('AddDurationFormComponent', () => {
  let component: AddDurationFormComponent;
  let fixture: ComponentFixture<AddDurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDurationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
