import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesFormComponent } from './sites-form.component';

describe('SitesFormComponent', () => {
  let component: SitesFormComponent;
  let fixture: ComponentFixture<SitesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
