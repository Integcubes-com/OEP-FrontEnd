import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNextOutagesMainComponent } from './site-next-outages-main.component';

describe('SiteNextOutagesMainComponent', () => {
  let component: SiteNextOutagesMainComponent;
  let fixture: ComponentFixture<SiteNextOutagesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteNextOutagesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteNextOutagesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
