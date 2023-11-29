import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserInsurenceComponent } from './end-user-insurence.component';

describe('EndUserInsurenceComponent', () => {
  let component: EndUserInsurenceComponent;
  let fixture: ComponentFixture<EndUserInsurenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndUserInsurenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUserInsurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
