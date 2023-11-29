import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilsComponent } from './tils.component';

describe('TilsComponent', () => {
  let component: TilsComponent;
  let fixture: ComponentFixture<TilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
