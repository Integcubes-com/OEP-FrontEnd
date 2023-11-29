import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLatestStatusComponent } from './add-latest-status.component';

describe('AddLatestStatusComponent', () => {
  let component: AddLatestStatusComponent;
  let fixture: ComponentFixture<AddLatestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLatestStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLatestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
