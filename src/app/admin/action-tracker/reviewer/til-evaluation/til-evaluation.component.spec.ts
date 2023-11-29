import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilEvaluationComponent } from './til-evaluation.component';

describe('TilEvaluationComponent', () => {
  let component: TilEvaluationComponent;
  let fixture: ComponentFixture<TilEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
