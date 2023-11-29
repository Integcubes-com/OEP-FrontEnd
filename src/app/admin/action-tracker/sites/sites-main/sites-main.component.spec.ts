import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesMainComponent } from './sites-main.component';

describe('SitesMainComponent', () => {
  let component: SitesMainComponent;
  let fixture: ComponentFixture<SitesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
