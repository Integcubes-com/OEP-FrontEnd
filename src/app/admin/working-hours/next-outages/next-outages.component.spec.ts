import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextOutagesComponent } from './next-outages.component';

describe('NextOutagesComponent', () => {
  let component: NextOutagesComponent;
  let fixture: ComponentFixture<NextOutagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextOutagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
