import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColmComponent } from './table-colm.component';

describe('TableColmComponent', () => {
  let component: TableColmComponent;
  let fixture: ComponentFixture<TableColmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableColmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableColmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
