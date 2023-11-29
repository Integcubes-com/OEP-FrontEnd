import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNextOutagesComponent } from './delete-next-outages.component';

describe('DeleteNextOutagesComponent', () => {
  let component: DeleteNextOutagesComponent;
  let fixture: ComponentFixture<DeleteNextOutagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNextOutagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNextOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
