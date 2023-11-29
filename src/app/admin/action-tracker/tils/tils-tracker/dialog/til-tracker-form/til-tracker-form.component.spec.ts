import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilTrackerFormComponent } from './til-tracker-form.component';

describe('TilTrackerFormComponent', () => {
  let component: TilTrackerFormComponent;
  let fixture: ComponentFixture<TilTrackerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilTrackerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilTrackerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
