import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrenneSearchReceiverComponent } from './strenne-search-receiver.component';

describe('StrenneSearchProfileComponent', () => {
  let component: StrenneSearchReceiverComponent;
  let fixture: ComponentFixture<StrenneSearchReceiverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrenneSearchReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrenneSearchReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
