import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilActionComponent } from './til-action.component';

describe('TilActionComponent', () => {
  let component: TilActionComponent;
  let fixture: ComponentFixture<TilActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
