import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActionRoleComponent } from './delete-action-role.component';

describe('DeleteActionRoleComponent', () => {
  let component: DeleteActionRoleComponent;
  let fixture: ComponentFixture<DeleteActionRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActionRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteActionRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
