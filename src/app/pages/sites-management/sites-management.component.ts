import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Profile } from '../../shared/model/profile.model';
import { Site } from '../../shared/model/site.model';
import { DialogService } from '../../shared/service/dialog.service';
import { BuildingManagerSelectionDialogComponent } from './building-manager-selection-dialog/building-manager-selection-dialog.component';
import { SitesManagementService } from './sites-management.service';

@Component({
  selector: 'app-sites-management',
  templateUrl: './sites-management.component.html',
  styleUrls: ['./sites-management.component.css']
})
export class SitesManagementComponent implements OnInit, OnDestroy {
  availableSites: Site[];
  filteredAvailableSites: Site[];
  availableSitesSub: Subscription;
  selectedSite: number;
  selectedSiteSub: Subscription;
  buildingManager: Profile;
  buildingManagerSub: Subscription;
  confirmDialogSub: Subscription;

  constructor(private dialog: MatDialog, private dialogService: DialogService, private sitesManagementService: SitesManagementService) { }

  ngOnInit(): void {
    this.availableSitesSub = this.sitesManagementService.availableSites.subscribe((availableSites) => {
      this.availableSites = availableSites;
      this.filteredAvailableSites = this.availableSites;
    });
    this.selectedSiteSub = this.sitesManagementService.selectedSite.subscribe((selectedSite) => {
      this.selectedSite = selectedSite;
    });
    this.buildingManagerSub = this.sitesManagementService.buildingManager.subscribe((buildingManager) => {
      this.buildingManager = buildingManager;
    });

    if (!this.availableSites.length) { this.sitesManagementService.getAvailableSites(); }
    if (this.selectedSite) { this.sitesManagementService.getSiteDetails(this.selectedSite); }
  }

  onSelectSite(idSite: number): void {
    this.sitesManagementService.setSelectedSite(idSite);
    this.sitesManagementService.setSiteDetails(null);
    this.sitesManagementService.getSiteDetails(idSite);
    this.sitesManagementService.setSiteBuildingManager(null);
    this.sitesManagementService.getSiteBuildingManager(idSite);
  }

  filterSiteList(newValue) {
    this.filteredAvailableSites = this.availableSites.filter((site: Site) => {
      // tslint:disable-next-line:max-line-length
      return (site.idArchibus.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 || site.address.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 || site.city.toLowerCase().indexOf(newValue.toLowerCase()) !== -1);
    });
  }

  openBuildingManagerSelectionDialog(buildingManager?: Profile): void {
    const dialogRef = this.dialog.open(BuildingManagerSelectionDialogComponent, {
      data: {
        buildingManager,
        siteAddress: this.selectedSiteAddress
      }
    });

    dialogRef.afterClosed().subscribe((newBuildingManager) => {
      if (newBuildingManager) {
        this.sitesManagementService.saveBuildingManager(this.selectedSite, newBuildingManager)
            .subscribe((response) => {
              if (response?.output) {
                this.sitesManagementService.setSiteBuildingManager(newBuildingManager);
                this.dialogService.openSuccessDialog('sitesManagement.addBuildingManagerSuccess');
              }
            },
            this.dialogService.openErrorDialog
          );
      }
    });
  }

  deleteBuildingManager(): void {
    const site = this.sitesManagementService.getSite()?.address;
    const buildingManager = this.buildingManager ? `${this.buildingManager.first_name} ${this.buildingManager.last_name}` : '';
    this.dialogService.openConfirmDialog('sitesManagement.deleteBuildingManagerConfirmation', {site, buildingManager}, this.selectedSite);
    if (!this.confirmDialogSub || this.confirmDialogSub.closed) {
      this.confirmDialogSub = this.dialogService.confirm.subscribe((value: number) => {
        this.sitesManagementService.deleteBuildingManager(this.selectedSite)
          .subscribe((response) => {
              if (response?.output) {
                this.dialog.closeAll();
                this.confirmDialogSub.unsubscribe();
                this.sitesManagementService.setSiteBuildingManager(null);
                setTimeout(() => {
                  this.dialogService.openSuccessDialog('sitesManagement.deleteBuildingManagerSuccess');
                }, 500);
              }
            },
            this.dialogService.openErrorDialog
          );
      });
    }

    this.sitesManagementService.deleteBuildingManager(this.selectedSite);
  }

  get selectedSiteAddress() {
    return this.sitesManagementService.getSite()?.address;
  }

  ngOnDestroy(): void {
    this.availableSitesSub?.unsubscribe();
    this.selectedSiteSub?.unsubscribe();
    this.buildingManagerSub?.unsubscribe();
  }
}
