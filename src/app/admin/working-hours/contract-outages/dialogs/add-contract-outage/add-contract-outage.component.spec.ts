import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractOutageComponent } from './add-contract-outage.component';

describe('AddContractOutageComponent', () => {
  let component: AddContractOutageComponent;
  let fixture: ComponentFixture<AddContractOutageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractOutageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContractOutageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
