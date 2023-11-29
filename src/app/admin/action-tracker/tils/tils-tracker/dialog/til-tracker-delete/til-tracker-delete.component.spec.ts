import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilTrackerDeleteComponent } from './til-tracker-delete.component';

describe('TilTrackerDeleteComponent', () => {
  let component: TilTrackerDeleteComponent;
  let fixture: ComponentFixture<TilTrackerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilTrackerDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilTrackerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
