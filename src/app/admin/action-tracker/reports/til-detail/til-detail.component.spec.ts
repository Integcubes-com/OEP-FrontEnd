import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilDetailComponent } from './til-detail.component';

describe('TilDetailComponent', () => {
  let component: TilDetailComponent;
  let fixture: ComponentFixture<TilDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
