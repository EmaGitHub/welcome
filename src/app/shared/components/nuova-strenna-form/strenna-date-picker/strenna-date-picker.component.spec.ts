import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrennaDatePickerComponent } from './strenna-date-picker.component';

describe('StrennaDatePickerComponent', () => {
  let component: StrennaDatePickerComponent;
  let fixture: ComponentFixture<StrennaDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrennaDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrennaDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
