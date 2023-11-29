import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTilActionComponent } from './assign-til-action.component';

describe('AssignTilActionComponent', () => {
  let component: AssignTilActionComponent;
  let fixture: ComponentFixture<AssignTilActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTilActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTilActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
