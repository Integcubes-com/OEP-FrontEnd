import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOutagesComponent } from './track-outages.component';

describe('TrackOutagesComponent', () => {
  let component: TrackOutagesComponent;
  let fixture: ComponentFixture<TrackOutagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOutagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
