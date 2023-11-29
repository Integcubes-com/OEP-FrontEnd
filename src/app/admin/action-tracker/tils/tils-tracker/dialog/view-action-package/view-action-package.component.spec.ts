import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActionPackageComponent } from './view-action-package.component';

describe('ViewActionPackageComponent', () => {
  let component: ViewActionPackageComponent;
  let fixture: ComponentFixture<ViewActionPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActionPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActionPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
