import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookingsSectionComponent } from './bookings-section.component';

describe('BookingsSectionComponent', () => {
  let component: BookingsSectionComponent;
  let fixture: ComponentFixture<BookingsSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
