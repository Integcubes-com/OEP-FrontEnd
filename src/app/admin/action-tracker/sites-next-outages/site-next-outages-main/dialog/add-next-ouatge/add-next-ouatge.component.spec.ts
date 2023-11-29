import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNextOuatgeComponent } from './add-next-ouatge.component';

describe('AddNextOuatgeComponent', () => {
  let component: AddNextOuatgeComponent;
  let fixture: ComponentFixture<AddNextOuatgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNextOuatgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNextOuatgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
