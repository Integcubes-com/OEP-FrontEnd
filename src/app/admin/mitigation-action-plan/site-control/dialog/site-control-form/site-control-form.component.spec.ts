import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteControlFormComponent } from './site-control-form.component';

describe('SiteControlFormComponent', () => {
  let component: SiteControlFormComponent;
  let fixture: ComponentFixture<SiteControlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteControlFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
