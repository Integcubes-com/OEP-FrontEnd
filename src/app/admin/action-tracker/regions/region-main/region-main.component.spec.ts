import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMainComponent } from './region-main.component';

describe('RegionMainComponent', () => {
  let component: RegionMainComponent;
  let fixture: ComponentFixture<RegionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
