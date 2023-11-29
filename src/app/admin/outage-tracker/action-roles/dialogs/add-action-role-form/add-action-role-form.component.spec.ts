import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionRoleFormComponent } from './add-action-role-form.component';

describe('AddActionRoleFormComponent', () => {
  let component: AddActionRoleFormComponent;
  let fixture: ComponentFixture<AddActionRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActionRoleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActionRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
