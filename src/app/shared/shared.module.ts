import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbAccordionModule, NgbCarouselModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MessageBoxModule, MessageService, NotificationWrapperModule, NotificationWrapperService } from '@secb/sbtcgc';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CustomPaginationComponent } from './components/custom-pagination/custom-pagination.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { BannerStrenneComponent } from './components/layout/banner-strenne/banner-strenne.component';
import { BannerComponent } from './components/layout/banner/banner.component';
import { PageTitleComponent } from './components/layout/page-title/page-title.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchProfilesAutocompleteComponent } from './components/search-profiles-autocomplete/search-profiles-autocomplete.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { AddAttributesDialogComponent } from './components/site-services-list/add-attributes-dialog/add-attributes-dialog.component';
import { SiteServicesListComponent } from './components/site-services-list/site-services-list.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { TextFilterSelectComponent } from './components/text-filter-select/text-filter-select.component';
import { UiLibExtModule } from './modules/ui-lib-ext.module';
import { RoundPipe } from './pipes/round.pipe';
import { CustomDateAdapter } from './service/custom-date-adapter.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiLibExtModule,
    TooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatGridListModule,
    MatRippleModule,
    MatProgressBarModule,
    MatRadioModule,
    NgbPaginationModule,
    MatProgressSpinnerModule,
    TranslateModule,
    NgbAccordionModule,
    MatChipsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({}),
    NgbTooltipModule 
  ],
  declarations: [
    BannerStrenneComponent,
    BannerComponent,
    InfoCardComponent,
    PaginatorComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    ConfirmDialogComponent,
    RoundPipe,
    SiteServicesListComponent,
    AddAttributesDialogComponent,
    PageTitleComponent,
    SearchProfilesAutocompleteComponent,
    TextFilterSelectComponent,
    SimpleDialogComponent,
    CustomPaginationComponent
  ],
  providers: [
    MessageService, 
    NotificationWrapperService, 
    DatePipe,
    {provide: DateAdapter, useClass: CustomDateAdapter},
    { provide: MAT_DATE_LOCALE, useValue: localStorage.getItem('selectedLang') },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
    ],
  exports: [
    BannerStrenneComponent,
    BannerComponent,
    CommonModule,
    FormsModule,
    UiLibExtModule,
    ReactiveFormsModule,
    NotificationWrapperModule,
    MessageBoxModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatBadgeModule,
    NgbPopoverModule,
    NgbPaginationModule,
    MatListModule,
    MatGridListModule,
    InfoCardComponent,
    MatRippleModule,
    MatProgressBarModule,
    MatRadioModule,
    PaginatorComponent,
    MatProgressSpinnerModule,
    ErrorDialogComponent,
    SuccessDialogComponent,
    ConfirmDialogComponent,
    TranslateModule,
    NgbCarouselModule,
    RoundPipe,
    CarouselModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgbAccordionModule,
    SiteServicesListComponent,
    AddAttributesDialogComponent,
    MatChipsModule,
    PageTitleComponent,
    NgCircleProgressModule,
    SearchProfilesAutocompleteComponent,
    TextFilterSelectComponent,
    NgbTooltipModule,
    CustomPaginationComponent 
  ]
})
export class SharedModule {
}
