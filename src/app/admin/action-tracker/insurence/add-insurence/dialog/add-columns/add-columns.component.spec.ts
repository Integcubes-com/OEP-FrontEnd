import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColumnsComponent } from './add-columns.component';

describe('AddColumnsComponent', () => {
  let component: AddColumnsComponent;
  let fixture: ComponentFixture<AddColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColumnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
