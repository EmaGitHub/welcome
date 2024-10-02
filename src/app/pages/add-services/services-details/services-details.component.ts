import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../shared/model/site-service.model';
import {Subscription} from 'rxjs';
import {AddServicesService} from '../add-services.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.css']
})
export class ServicesDetailsComponent implements OnInit, OnDestroy {
  @Input() stepper: any;
  newSiteServices: SiteService[];
  newSiteServicesSub: Subscription;

  constructor(private addServicesService: AddServicesService) { }

  ngOnInit(): void {
    this.newSiteServicesSub = this.addServicesService.newSiteServices.subscribe((newSiteServices) => {
      this.newSiteServices = newSiteServices;
    });
  }

  setNewSiteServices(siteServices: SiteService[]): void {
    this.addServicesService.setNewSiteServices(siteServices);
  }

  deleteService(idService: number): void {
    _.remove(this.newSiteServices, {id_service: idService});
    this.setNewSiteServices(this.newSiteServices);
  }

  cleanServices(): void {
    this.newSiteServices.forEach((service) => {
      _.remove(service.attributeServiceList, (attribute) => {
        return _.isEmpty(_.trim(attribute.value));
      });
    });
    this.setNewSiteServices(this.newSiteServices);
  }

  onContinue(): void {
    this.cleanServices();
    this.stepper.next();
  }

  ngOnDestroy(): void {
    this.newSiteServicesSub?.unsubscribe();
  }
}
