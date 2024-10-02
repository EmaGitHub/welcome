import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SitesManagementService} from '../sites-management/sites-management.service';
import {Site} from '../../shared/model/site.model';
import {Profile} from '../../shared/model/profile.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit, OnDestroy {
  availableSites: Site[];
  availableSitesSub: Subscription;
  selectedSite: number;
  selectedSiteSub: Subscription;
  buildingManager: Profile;
  buildingManagerSub: Subscription;
  @ViewChild('stepper') stepper: any;
  selectedStepIndex = 0;
  steps = [
    {
      title: 'services.select'
    }, {
      title: 'services.details'
    }, {
      title: 'generic.confirmAndSave'
    }
  ];

  constructor(private sitesManagementService: SitesManagementService) {}

  ngOnInit(): void {
    this.availableSitesSub = this.sitesManagementService.availableSites.subscribe((availableSites) => {
      this.availableSites = availableSites;
    });
    this.selectedSiteSub = this.sitesManagementService.selectedSite.subscribe((selectedSite) => {
      this.selectedSite = selectedSite;
    });
    this.buildingManagerSub = this.sitesManagementService.buildingManager.subscribe((buildingManager) => {
      this.buildingManager = buildingManager;
    });
  }

  get site() {
    return this.sitesManagementService.getSite();
  }

  selectionChange(step): void {
    this.selectedStepIndex = step.selectedIndex;
  }

  ngOnDestroy() {
    this.availableSitesSub?.unsubscribe();
    this.selectedSiteSub?.unsubscribe();
    this.buildingManagerSub?.unsubscribe();
  }
}
