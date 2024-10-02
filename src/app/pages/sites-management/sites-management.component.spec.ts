import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SitesManagementComponent } from './sites-management.component';

describe('SitesManagementComponent', () => {
  let component: SitesManagementComponent;
  let fixture: ComponentFixture<SitesManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
