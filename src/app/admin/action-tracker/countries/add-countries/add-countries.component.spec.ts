import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountriesComponent } from './add-countries.component';

describe('AddCountriesComponent', () => {
  let component: AddCountriesComponent;
  let fixture: ComponentFixture<AddCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCountriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
