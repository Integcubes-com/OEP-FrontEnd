import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyAlertComponent } from './copy-alert.component';

describe('CopyAlertComponent', () => {
  let component: CopyAlertComponent;
  let fixture: ComponentFixture<CopyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
