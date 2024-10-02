import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ManagerInfoDialogComponent} from './manager-info-dialog/manager-info-dialog.component';
import {SiteDetails} from '../sites-management/site-details.model';
import {Subscription} from 'rxjs';
import {HomeService} from './home.service';
import {Profile} from '../../shared/model/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userSiteDetails: SiteDetails;
  userSiteDetailsSub: Subscription;
  userBuildingManager: Profile;
  userBuildingManagerSub: Subscription;

  constructor(private dialog: MatDialog, private homeService: HomeService) { }

  ngOnInit(): void {
    this.userSiteDetailsSub = this.homeService.userSiteDetails.subscribe((userSiteDetails) => {
      this.userSiteDetails = userSiteDetails;
      if (this.userSiteDetails) {
        this.homeService.getUserBuildingManager();
      }
    });
    this.userBuildingManagerSub = this.homeService.userBuildingManager.subscribe((userBuildingManager) => {
      this.userBuildingManager = userBuildingManager;
    });

    if (!this.userSiteDetails) {
      this.homeService.getUserSiteDetails();
    }
  }

  openManagerInfoDialog(): void {
    this.dialog.open(ManagerInfoDialogComponent, {
      data: {
        buildingManager: this.userBuildingManager
      }
    });
  }

  ngOnDestroy() {
    this.userSiteDetailsSub?.unsubscribe();
    this.userBuildingManagerSub?.unsubscribe();
  }
}
