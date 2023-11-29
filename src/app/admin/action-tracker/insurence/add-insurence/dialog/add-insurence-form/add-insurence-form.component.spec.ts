import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsurenceFormComponent } from './add-insurence-form.component';

describe('AddInsurenceFormComponent', () => {
  let component: AddInsurenceFormComponent;
  let fixture: ComponentFixture<AddInsurenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsurenceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsurenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
