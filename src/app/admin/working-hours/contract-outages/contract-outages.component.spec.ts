import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOutagesComponent } from './contract-outages.component';

describe('ContractOutagesComponent', () => {
  let component: ContractOutagesComponent;
  let fixture: ComponentFixture<ContractOutagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractOutagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
