import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClusterComponent } from './delete-cluster.component';

describe('DeleteClusterComponent', () => {
  let component: DeleteClusterComponent;
  let fixture: ComponentFixture<DeleteClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteClusterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
