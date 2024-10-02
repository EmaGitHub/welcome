import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../home.service';
import {Booking} from '../../booking.model';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {
  bookings: Booking[];
  bookingsSub: Subscription;
  displayedColumns = ['activity', 'site', 'date', 'time', 'actions'];
  columnDesc = {
    activity: 'generic.activity',
    site: 'generic.site',
    date: 'generic.date',
    time: 'generic.time',
    actions: ''
  };
  page = 1;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.bookingsSub = this.homeService.bookings
        .pipe(filter(bookings => !!bookings))
        .subscribe((bookings) => {
          this.bookings = bookings;
        });
    this.homeService.getBookings();
  }

}
