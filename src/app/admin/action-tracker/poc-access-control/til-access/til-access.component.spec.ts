import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilAccessComponent } from './til-access.component';

describe('TilAccessComponent', () => {
  let component: TilAccessComponent;
  let fixture: ComponentFixture<TilAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
