import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTilsComponent } from './add-tils.component';

describe('AddTilsComponent', () => {
  let component: AddTilsComponent;
  let fixture: ComponentFixture<AddTilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
