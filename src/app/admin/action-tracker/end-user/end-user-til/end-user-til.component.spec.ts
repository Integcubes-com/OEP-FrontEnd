import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserTilComponent } from './end-user-til.component';

describe('EndUserTilComponent', () => {
  let component: EndUserTilComponent;
  let fixture: ComponentFixture<EndUserTilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndUserTilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUserTilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
