import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilsTrackerComponent } from './tils-tracker.component';

describe('TilsTrackerComponent', () => {
  let component: TilsTrackerComponent;
  let fixture: ComponentFixture<TilsTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilsTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
