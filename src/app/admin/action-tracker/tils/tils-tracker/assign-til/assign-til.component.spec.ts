import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTilComponent } from './assign-til.component';

describe('AssignTilComponent', () => {
  let component: AssignTilComponent;
  let fixture: ComponentFixture<AssignTilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
