import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteControlComponent } from './site-control.component';

describe('SiteControlComponent', () => {
  let component: SiteControlComponent;
  let fixture: ComponentFixture<SiteControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
