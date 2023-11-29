import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNextOutagesComponent } from './add-next-outages.component';

describe('AddNextOutagesComponent', () => {
  let component: AddNextOutagesComponent;
  let fixture: ComponentFixture<AddNextOutagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNextOutagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNextOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
