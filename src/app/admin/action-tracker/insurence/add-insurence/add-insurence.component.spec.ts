import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsurenceComponent } from './add-insurence.component';

describe('AddInsurenceComponent', () => {
  let component: AddInsurenceComponent;
  let fixture: ComponentFixture<AddInsurenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsurenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
