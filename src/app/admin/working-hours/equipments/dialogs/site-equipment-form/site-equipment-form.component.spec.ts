import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteEquipmentFormComponent } from './site-equipment-form.component';

describe('SiteEquipmentFormComponent', () => {
  let component: SiteEquipmentFormComponent;
  let fixture: ComponentFixture<SiteEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteEquipmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
