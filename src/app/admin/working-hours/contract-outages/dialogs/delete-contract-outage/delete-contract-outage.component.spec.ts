import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractOutageComponent } from './delete-contract-outage.component';

describe('DeleteContractOutageComponent', () => {
  let component: DeleteContractOutageComponent;
  let fixture: ComponentFixture<DeleteContractOutageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteContractOutageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteContractOutageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
