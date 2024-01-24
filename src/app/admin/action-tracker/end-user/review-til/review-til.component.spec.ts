import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTilComponent } from './review-til.component';

describe('ReviewTilComponent', () => {
  let component: ReviewTilComponent;
  let fixture: ComponentFixture<ReviewTilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
