import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from '../../shared/components/layout/banner/banner.component';
import { SharedModule } from '../../shared/shared.module';
import { ServicesCardsComponent } from './services-cards/services-cards.component';
import { BookingsSectionComponent } from './bookings-section/bookings-section.component';
import { BookingsFiltersComponent } from './bookings-section/bookings-filters/bookings-filters.component';
import { BookingsListComponent } from './bookings-section/bookings-list/bookings-list.component';
import { ManagerInfoDialogComponent } from './manager-info-dialog/manager-info-dialog.component';
import { StrenneManagementModule } from '../strenne-management/strenne-management.module';
import { StrenneManagementComponent } from '../strenne-management/strenne-management.component';


@NgModule({
  declarations: [
    HomeComponent,
    ServicesCardsComponent,
    BookingsSectionComponent,
    BookingsFiltersComponent,
    BookingsListComponent,
    ManagerInfoDialogComponent , 
    // StrenneManagementComponent
  ],
  imports: [
    // StrenneManagementModule , 
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
