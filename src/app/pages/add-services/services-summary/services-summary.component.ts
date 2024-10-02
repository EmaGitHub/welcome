import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AddServicesService } from '../add-services.service';
import { Subscription } from 'rxjs';
import { SiteService } from '../../../shared/model/site-service.model';
import { Router } from '@angular/router';
import { SitesManagementService } from '../../sites-management/sites-management.service';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-services-summary',
  templateUrl: './services-summary.component.html',
  styleUrls: ['./services-summary.component.css']
})
export class ServicesSummaryComponent implements OnInit, OnDestroy {
  @Input() stepper: any;
  newSiteServices: SiteService[];
  newSiteServicesSub: Subscription;
  selectedSite: number;
  selectedSiteSub: Subscription;

  constructor(private router: Router, private addServicesService: AddServicesService, private dialogService: DialogService,
    private sitesManagementService: SitesManagementService) { }

  ngOnInit(): void {
    this.newSiteServicesSub = this.addServicesService.newSiteServices.subscribe((newSiteServices) => {
      this.newSiteServices = newSiteServices;
    });
    this.selectedSiteSub = this.sitesManagementService.selectedSite.subscribe((selectedSite) => {
      this.selectedSite = selectedSite;
    });
  }

  confirm(): void {
    this.addServicesService.saveSiteServices(this.selectedSite, this.newSiteServices)
      .subscribe(
        (response) => {
          if (response.output) {
            this.dialogService.openSuccessDialog('sitesManagement.servicesAdded')
              .afterClosed()
              .subscribe(() => {
                this.router.navigateByUrl('sites-management');
              });
          }
        },
        this.dialogService.openErrorDialog
      );
  }

  ngOnDestroy(): void {
    this.newSiteServicesSub?.unsubscribe();
    this.selectedSiteSub?.unsubscribe();
  }
}
