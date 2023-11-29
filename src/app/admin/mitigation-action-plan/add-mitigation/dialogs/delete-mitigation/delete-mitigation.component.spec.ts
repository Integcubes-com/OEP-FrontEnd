import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMitigationComponent } from './delete-mitigation.component';

describe('DeleteMitigationComponent', () => {
  let component: DeleteMitigationComponent;
  let fixture: ComponentFixture<DeleteMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
