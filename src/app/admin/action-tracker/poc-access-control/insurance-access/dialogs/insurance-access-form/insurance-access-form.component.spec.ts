import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAccessFormComponent } from './insurance-access-form.component';

describe('InsuranceAccessFormComponent', () => {
  let component: InsuranceAccessFormComponent;
  let fixture: ComponentFixture<InsuranceAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceAccessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
