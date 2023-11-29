import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsurenceComponent } from './view-insurence.component';

describe('ViewInsurenceComponent', () => {
  let component: ViewInsurenceComponent;
  let fixture: ComponentFixture<ViewInsurenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInsurenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInsurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
