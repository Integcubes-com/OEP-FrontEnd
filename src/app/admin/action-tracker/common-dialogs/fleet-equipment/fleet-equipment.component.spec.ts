import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetEquipmentComponent } from './fleet-equipment.component';

describe('FleetEquipmentComponent', () => {
  let component: FleetEquipmentComponent;
  let fixture: ComponentFixture<FleetEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
