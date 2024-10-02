import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SiteServicesComponent } from './site-services.component';

describe('SiteServicesComponent', () => {
  let component: SiteServicesComponent;
  let fixture: ComponentFixture<SiteServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
