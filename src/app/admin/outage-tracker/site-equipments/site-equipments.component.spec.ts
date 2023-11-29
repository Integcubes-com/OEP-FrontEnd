import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteEquipmentsComponent } from './site-equipments.component';

describe('SiteEquipmentsComponent', () => {
  let component: SiteEquipmentsComponent;
  let fixture: ComponentFixture<SiteEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteEquipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
