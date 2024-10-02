import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SiteServicesListComponent } from './site-services-list.component';

describe('SiteServicesListComponent', () => {
  let component: SiteServicesListComponent;
  let fixture: ComponentFixture<SiteServicesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteServicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
