import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SiteActivitiesComponent } from './site-activities.component';

describe('SiteActivitiesComponent', () => {
  let component: SiteActivitiesComponent;
  let fixture: ComponentFixture<SiteActivitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
