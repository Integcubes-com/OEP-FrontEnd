import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timeline2Component } from './timeline2.component';

describe('Timeline2Component', () => {
  let component: Timeline2Component;
  let fixture: ComponentFixture<Timeline2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Timeline2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timeline2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
