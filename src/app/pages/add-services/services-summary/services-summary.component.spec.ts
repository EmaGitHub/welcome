import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesSummaryComponent } from './services-summary.component';

describe('ServicesSummaryComponent', () => {
  let component: ServicesSummaryComponent;
  let fixture: ComponentFixture<ServicesSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
