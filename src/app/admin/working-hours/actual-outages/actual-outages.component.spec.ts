import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualOutagesComponent } from './actual-outages.component';

describe('ActualOutagesComponent', () => {
  let component: ActualOutagesComponent;
  let fixture: ComponentFixture<ActualOutagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualOutagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
