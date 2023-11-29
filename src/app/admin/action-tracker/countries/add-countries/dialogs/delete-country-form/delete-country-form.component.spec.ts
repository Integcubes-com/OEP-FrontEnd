import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCountryFormComponent } from './delete-country-form.component';

describe('DeleteCountryFormComponent', () => {
  let component: DeleteCountryFormComponent;
  let fixture: ComponentFixture<DeleteCountryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCountryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
