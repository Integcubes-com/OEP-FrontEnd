import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePdfComponent } from './delete-pdf.component';

describe('DeletePdfComponent', () => {
  let component: DeletePdfComponent;
  let fixture: ComponentFixture<DeletePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
