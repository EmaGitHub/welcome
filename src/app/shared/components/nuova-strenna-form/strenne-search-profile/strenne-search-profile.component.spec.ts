import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrenneSearchProfileComponent } from './strenne-search-profile.component';

describe('StrenneSearchProfileComponent', () => {
  let component: StrenneSearchProfileComponent;
  let fixture: ComponentFixture<StrenneSearchProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrenneSearchProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrenneSearchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
