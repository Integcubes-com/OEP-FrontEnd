import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionsComponent } from './add-actions.component';

describe('AddActionsComponent', () => {
  let component: AddActionsComponent;
  let fixture: ComponentFixture<AddActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
