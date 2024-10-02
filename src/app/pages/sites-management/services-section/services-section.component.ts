import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { SiteService } from '../../../shared/model/site-service.model';
import { DialogService } from '../../../shared/service/dialog.service';
import { AddServicesService } from '../../add-services/add-services.service';
import { SiteDetails } from '../site-details.model';
import { SitesManagementService } from '../sites-management.service';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  siteDetails: SiteDetails;
  siteDetailsSub: Subscription;
  selectedSite: number;
  selectedSiteSub: Subscription;
  originalSiteServices: SiteService[];
  confirmDialogSub: Subscription;

  constructor(private router: Router, private sitesManagementService: SitesManagementService, private dialog: MatDialog,
              private addServicesService: AddServicesService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.siteDetailsSub = this.sitesManagementService.siteDetails.subscribe((siteDetails) => {
      this.siteDetails = siteDetails;
      if (!this.originalSiteServices && !!siteDetails) {
        this.originalSiteServices = _.cloneDeep(siteDetails.serviceList);
      }
    });
    this.selectedSiteSub = this.sitesManagementService.selectedSite.subscribe((selectedSite) => {
      this.selectedSite = selectedSite;
    });
  }

  setSiteDetails(): void {
    this.sitesManagementService.setSiteDetails(this.siteDetails);
  }

  goToAddServices(): void {
    this.addServicesService.setNewSiteServices([]);
    this.router.navigate(['/add-services']);
  }

  deleteService(idService: number): void {
    this.dialogService.openConfirmDialog('sitesManagement.deleteServiceConfirmation', {}, idService);
    if (!this.confirmDialogSub || this.confirmDialogSub.closed) {
      this.confirmDialogSub = this.dialogService.confirm.subscribe((value: number) => {
        this.sitesManagementService.deleteSiteService(this.selectedSite, value)
          .subscribe((response) => {
              if (response.output) {
                this.dialog.closeAll();
                this.confirmDialogSub.unsubscribe();
                this.sitesManagementService.getSiteDetails(this.selectedSite);
                setTimeout(() => {
                  this.dialogService.openSuccessDialog('sitesManagement.deleteServiceSuccess');
                }, 500);
              }
            },
            this.dialogService.openErrorDialog
          );
      });
    }
  }

  saveService(service: SiteService): void {
    this.sitesManagementService.updateSiteService(this.selectedSite, [service])
      .subscribe(
        (response) => {
          if (response.output) {
            // Update cloned service
            const originalServiceIndex = _.findIndex(this.originalSiteServices, {id_service: service.id_service});
            this.originalSiteServices.splice(originalServiceIndex, 1, _.cloneDeep(service));
            this.dialogService.openSuccessDialog('sitesManagement.serviceUpdated');
          } else {
            this.cancelServiceUpdates(service);
            this.dialogService.openErrorDialog();
          }
        },
        (error) => {
          this.cancelServiceUpdates(service);
          this.dialogService.openErrorDialog();
        }
      );
  }

  cancelServiceUpdates(service: SiteService): void {
    const oldService = _.find(this.originalSiteServices, {id_service: service.id_service});
    const serviceIndex = _.findIndex(this.siteDetails.serviceList, {id_service: service.id_service});
    this.siteDetails.serviceList.splice(serviceIndex, 1, _.cloneDeep(oldService));
    this.setSiteDetails();
  }

  ngOnDestroy(): void {
    this.siteDetailsSub?.unsubscribe();
    this.selectedSiteSub?.unsubscribe();
  }
}
