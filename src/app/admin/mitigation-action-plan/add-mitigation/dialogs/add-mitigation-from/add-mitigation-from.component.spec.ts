import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMitigationFromComponent } from './add-mitigation-from.component';

describe('AddMitigationFromComponent', () => {
  let component: AddMitigationFromComponent;
  let fixture: ComponentFixture<AddMitigationFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMitigationFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMitigationFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
