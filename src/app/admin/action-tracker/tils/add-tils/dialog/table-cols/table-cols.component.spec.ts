import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColsComponent } from './table-cols.component';

describe('TableColsComponent', () => {
  let component: TableColsComponent;
  let fixture: ComponentFixture<TableColsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableColsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
