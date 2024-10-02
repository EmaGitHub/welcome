import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceAttributeType } from '../../../shared/constants/ServiceAttributeType';
import { DialogService } from '../../../shared/service/dialog.service';
import { AddServiceAttributeType } from '../add-service-attribute/service-attribute-type.model';
import { HandleServiceAttributeDialogComponent } from '../handle-service-attribute-dialog/handle-service-attribute-dialog.component';
import { Service } from '../model/service.model';
import { ServiceAttributeCard } from '../service-attribute-card/service-attribute-card.model';
import { ServiceAttributeService } from '../services-attributes-management.service';
import { RestResponse } from 'src/app/shared/model/message';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit, OnDestroy {

  services: Service[];
  filteredServices: Service[];
  servicesSub: Subscription;
  saveServiceAttributeDoneSub: Subscription;
  confirmDialogSub: Subscription;
  filterText: string;

  counter : number = 0  ; 

  type: AddServiceAttributeType = {
    searchTitle: 'saManagement.service',
    searchPlaceholder: 'saManagement.searchService',
    button: 'saManagement.newService'
  };

  constructor(private serviceAttributeService: ServiceAttributeService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.serviceAttributeService.getAllServices();

    this.servicesSub = this.serviceAttributeService.services
      .subscribe((services) => {
        this.services = services;
        this.filteredServices = this.services;
        if (this.filterText) {
          this.filterList(this.filterText);
        }
      });

    this.saveServiceAttributeDoneSub = this.serviceAttributeService.saveServiceAttributeDone.subscribe(() => {
      setTimeout(() => {
        this.dialogService.openSuccessDialog('saManagement.saveServiceSuccess');
      }, 500);
      this.serviceAttributeService.getAllServices();
    });
  }

  filterList(filter: string) {
    this.filterText = filter;
    if (this.filterText) {
      this.filteredServices = this.services.filter((service: Service) => {
        return service.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;
      });
    } else {
      this.filteredServices = this.services;
    }
  }

  addService() {
    this.dialog.open(HandleServiceAttributeDialogComponent, {
      id: 'handle-service-attribute',
      maxWidth: '800px',
      data: {
        type: ServiceAttributeType.SERVICE
      }
    });
  }

  editService(serviceAttributeCard: ServiceAttributeCard) {
    // tslint:disable-next-line:variable-name
    const service: Service = this.services.find((_service: Service) => {
      return _service.id_service === serviceAttributeCard.id;
    });
    this.dialog.open(HandleServiceAttributeDialogComponent, {
      id: 'handle-service-attribute',
      maxWidth: '800px',
      data: {
        serviceAttribute: service,
        type: ServiceAttributeType.SERVICE
      }
    });
  }

  deleteService(serviceAttributeCard: ServiceAttributeCard) {
    this.dialogService.openConfirmDialog('saManagement.confirmServiceDelete', { service: serviceAttributeCard.name }, serviceAttributeCard);
    if (!this.confirmDialogSub || this.confirmDialogSub.closed) {
      this.confirmDialogSub = this.dialogService.confirm.subscribe((value: ServiceAttributeCard) => {
        this.serviceAttributeService.deleteService(value.id).subscribe(() => {
          this.dialog.closeAll();
          this.serviceAttributeService.getAllServices();
          this.confirmDialogSub.unsubscribe();
          setTimeout(() => {
            this.dialogService.openSuccessDialog('saManagement.deleteServiceSuccess');
          }, 500);
        });
      });
    }
  }

  getService(service: Service): ServiceAttributeCard {
    return {
      icon: service.icon,
      name: service.name,
      id: service.id_service,
      language: service.language,
      is_deleted: service.is_deleted,
      type: ServiceAttributeType.SERVICE,
      category: service.category
    };
  }

  ngOnDestroy(): void {
    this.servicesSub?.unsubscribe();
    this.saveServiceAttributeDoneSub?.unsubscribe();
  }
  
  retieveCategory(id_service: number): string {
    let myString: string ="null" ; 
    this.serviceAttributeService.getCategoryById(id_service).subscribe(
      (response: RestResponse<any>) => {
        if (!response.errorMessages) {
          myString = response.output.name; 
        } else {
          console.error('Errore nella chiamata al servizio:', response.errorMessages);
        }
      },
      (error) => {
        console.error('Errore durante la chiamata al servizio:', error);
      }
    );
    return myString ; 
  }

}

