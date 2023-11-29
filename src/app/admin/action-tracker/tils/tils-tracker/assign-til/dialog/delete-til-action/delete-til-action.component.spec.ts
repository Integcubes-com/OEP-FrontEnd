import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTilActionComponent } from './delete-til-action.component';

describe('DeleteTilActionComponent', () => {
  let component: DeleteTilActionComponent;
  let fixture: ComponentFixture<DeleteTilActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTilActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTilActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
