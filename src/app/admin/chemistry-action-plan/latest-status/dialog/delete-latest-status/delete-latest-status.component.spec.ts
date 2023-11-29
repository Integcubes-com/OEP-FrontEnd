import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLatestStatusComponent } from './delete-latest-status.component';

describe('DeleteLatestStatusComponent', () => {
  let component: DeleteLatestStatusComponent;
  let fixture: ComponentFixture<DeleteLatestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLatestStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLatestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
