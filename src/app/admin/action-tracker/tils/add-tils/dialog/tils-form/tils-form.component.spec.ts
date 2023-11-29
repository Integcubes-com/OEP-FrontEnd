import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilsFormComponent } from './tils-form.component';

describe('TilsFormComponent', () => {
  let component: TilsFormComponent;
  let fixture: ComponentFixture<TilsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
