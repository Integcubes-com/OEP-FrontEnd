import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEquipmentMainComponent } from './model-equipment-main.component';

describe('ModelEquipmentMainComponent', () => {
  let component: ModelEquipmentMainComponent;
  let fixture: ComponentFixture<ModelEquipmentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelEquipmentMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelEquipmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
