import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCalcComponent } from './delete-calc.component';

describe('DeleteCalcComponent', () => {
  let component: DeleteCalcComponent;
  let fixture: ComponentFixture<DeleteCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
