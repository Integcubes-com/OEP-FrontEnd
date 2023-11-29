import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOutagesFormComponent } from './track-outages-form.component';

describe('TrackOutagesFormComponent', () => {
  let component: TrackOutagesFormComponent;
  let fixture: ComponentFixture<TrackOutagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOutagesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOutagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
