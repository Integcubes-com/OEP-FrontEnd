import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilsFormDeleteComponent } from './tils-form-delete.component';

describe('TilsFormDeleteComponent', () => {
  let component: TilsFormDeleteComponent;
  let fixture: ComponentFixture<TilsFormDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilsFormDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilsFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
