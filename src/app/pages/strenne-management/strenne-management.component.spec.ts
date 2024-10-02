import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrenneManagementComponent } from './strenne-management.component';

describe('StrenneManagementComponent', () => {
  let component: StrenneManagementComponent;
  let fixture: ComponentFixture<StrenneManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrenneManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrenneManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
