import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMainComponent } from './cluster-main.component';

describe('ClusterMainComponent', () => {
  let component: ClusterMainComponent;
  let fixture: ComponentFixture<ClusterMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
