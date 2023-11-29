import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualOutageFormComponent } from './actual-outage-form.component';

describe('ActualOutageFormComponent', () => {
  let component: ActualOutageFormComponent;
  let fixture: ComponentFixture<ActualOutageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualOutageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualOutageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
