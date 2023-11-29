import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTrashComponent } from './role-trash.component';

describe('RoleTrashComponent', () => {
  let component: RoleTrashComponent;
  let fixture: ComponentFixture<RoleTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleTrashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
