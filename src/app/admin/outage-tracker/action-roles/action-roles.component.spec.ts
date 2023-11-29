import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRolesComponent } from './action-roles.component';

describe('ActionRolesComponent', () => {
  let component: ActionRolesComponent;
  let fixture: ComponentFixture<ActionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
