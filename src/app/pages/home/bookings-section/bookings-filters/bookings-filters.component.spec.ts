import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookingsFiltersComponent } from './bookings-filters.component';

describe('BookingsFiltersComponent', () => {
  let component: BookingsFiltersComponent;
  let fixture: ComponentFixture<BookingsFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
