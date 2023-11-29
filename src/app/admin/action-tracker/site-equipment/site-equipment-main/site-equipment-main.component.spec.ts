import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteEquipmentMainComponent } from './site-equipment-main.component';

describe('SiteEquipmentMainComponent', () => {
  let component: SiteEquipmentMainComponent;
  let fixture: ComponentFixture<SiteEquipmentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteEquipmentMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteEquipmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
