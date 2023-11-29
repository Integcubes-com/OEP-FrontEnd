import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOutagesForm2Component } from './track-outages-form2.component';

describe('TrackOutagesForm2Component', () => {
  let component: TrackOutagesForm2Component;
  let fixture: ComponentFixture<TrackOutagesForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOutagesForm2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOutagesForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
