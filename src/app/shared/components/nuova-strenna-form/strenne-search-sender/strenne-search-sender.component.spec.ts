import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrenneSearchSenderComponent } from './strenne-search-sender.component';

describe('StrenneSearchProfileComponent', () => {
  let component: StrenneSearchSenderComponent;
  let fixture: ComponentFixture<StrenneSearchSenderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrenneSearchSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrenneSearchSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
