import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Service} from '../../services-attributes-management/model/service.model';
import {Subscription} from 'rxjs';
import {AddServicesService} from '../add-services.service';
import {remove} from 'lodash';
import {SiteService} from '../../../shared/model/site-service.model';
import {SitesManagementService} from '../../sites-management/sites-management.service';

@Component({
  selector: 'app-services-selection',
  templateUrl: './services-selection.component.html',
  styleUrls: ['./services-selection.component.css']
})
export class ServicesSelectionComponent implements OnInit, OnDestroy {
  @Input() stepper: any;
  deltaServices: Service[];
  deltaServicesSub: Subscription;
  newSiteServices: SiteService[];
  newSiteServicesSub: Subscription;
  selectedSite: number;
  selectedSiteSub: Subscription;
  filterBy = '';

  constructor(public router: Router, private addServicesService: AddServicesService,
              private sitesManagementService: SitesManagementService) { }

  ngOnInit(): void {
    this.deltaServicesSub = this.addServicesService.deltaServices.subscribe((deltaServices) => {
      this.deltaServices = deltaServices;
    });
    this.newSiteServicesSub = this.addServicesService.newSiteServices.subscribe((newSiteServices) => {
      this.newSiteServices = newSiteServices;
    });
    this.selectedSiteSub = this.sitesManagementService.selectedSite.subscribe((selectedSite) => {
      this.selectedSite = selectedSite;
    });

    this.addServicesService.getDeltaServices(this.selectedSite);
  }

  get filteredServices(): Service[] {
    if (!this.filterBy) {
      return this.deltaServices;
    }

    return this.deltaServices.filter((service) => service.name.toLowerCase().includes(this.filterBy.toLowerCase()));
  }

  toggleNewSiteService(service: Service): void {
    this.isSiteServiceSelected(service.id_service)
        ? remove(this.newSiteServices, (s) => s.id_service === service.id_service)
        : this.newSiteServices.push(service as SiteService);
    this.setNewSiteServices();
  }

  isSiteServiceSelected(idService: number): boolean {
    return !!this.newSiteServices.find((newSiteService) => newSiteService.id_service === idService);
  }

  setNewSiteServices(): void {
    this.addServicesService.setNewSiteServices(this.newSiteServices);
  }

  ngOnDestroy(): void {
    this.deltaServicesSub?.unsubscribe();
    this.newSiteServicesSub?.unsubscribe();
    this.selectedSiteSub?.unsubscribe();
  }
}
