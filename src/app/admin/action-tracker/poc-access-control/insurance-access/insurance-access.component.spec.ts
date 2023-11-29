import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAccessComponent } from './insurance-access.component';

describe('InsuranceAccessComponent', () => {
  let component: InsuranceAccessComponent;
  let fixture: ComponentFixture<InsuranceAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
