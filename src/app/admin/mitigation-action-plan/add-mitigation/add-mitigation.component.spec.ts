import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMitigationComponent } from './add-mitigation.component';

describe('AddMitigationComponent', () => {
  let component: AddMitigationComponent;
  let fixture: ComponentFixture<AddMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
