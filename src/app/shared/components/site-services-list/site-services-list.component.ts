import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAttributesDialogComponent } from './add-attributes-dialog/add-attributes-dialog.component';
import { SiteService } from '../../model/site-service.model';
import { remove, findIndex } from 'lodash';
import { ServiceAttribute } from '../../model/service-attribute.model';
import { Subscription } from 'rxjs';
import { ServiceAttributeService } from '../../../pages/services-attributes-management/services-attributes-management.service';
import * as _ from 'lodash';
import { DialogService } from '../../service/dialog.service';
import { Utility } from '../../utils/utility';
import { Attribute } from 'src/app/pages/services-attributes-management/model/attribute.model';


@Component({
  selector: 'app-site-services-list',
  templateUrl: './site-services-list.component.html',
  styleUrls: ['./site-services-list.component.css']
})
export class SiteServicesListComponent implements OnInit, OnDestroy {
  @Input() servicesInsertion: boolean;
  @Input() services: SiteService[];
  @Output() deleteService = new EventEmitter<number>();
  @Output() changeServices = new EventEmitter<SiteService[]>();
  @Output() saveService = new EventEmitter<SiteService>();
  @Output() cancelServiceUpdates = new EventEmitter<SiteService>();
  availableAttributes: ServiceAttribute[];
  availableAttributesSub: Subscription;
  editingServices = new Map<number, boolean>();

  constructor(private dialog: MatDialog, private serviceAttributeService: ServiceAttributeService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.availableAttributesSub = this.serviceAttributeService.attributes.subscribe((availableAttributes) => {
      this.availableAttributes = availableAttributes as ServiceAttribute[];
    });
  }

  getAttributes(service: SiteService): void {
    this.availableAttributes?.length
      ? this.openAddAttributesDialog(service)
      : this.serviceAttributeService.getAllAttributes(() => {
        this.openAddAttributesDialog(service);
      }, () => {
        this.dialogService.openErrorDialog();
      });
  }

  openAddAttributesDialog(service: SiteService): void {
    const dialogRef = this.dialog.open(AddAttributesDialogComponent, {
      width: '500px',
      data: {
        availableAttributes: _.cloneDeep(this.availableAttributes),
        service: _.cloneDeep(service)
      }
    });

    dialogRef.afterClosed().subscribe((newService) => {
      if (newService) {
        const index = findIndex(this.services, { id_service: newService.id_service });
        this.services.splice(index, 1, newService);
        this.onChangeServices();
      }
    });
  }

  selectFile(event: any, attribute: Attribute) {
    Utility.getUploadedFile(event, (ev) => {
      attribute.attachment = ev.target.result
      attribute.value = event.target.files[0].name;
      this.onChangeServices();
    });
  }

  downloadAttachment(attribute: Attribute) {
    Utility.downloadFile(attribute.value, attribute.attachment);
  }

  cleanFileFilters(attribute: Attribute) {
    if (attribute && attribute.attachment) {
      attribute.attachment = null;
      this.onChangeServices();
    }
    return;
  }

  deleteAttribute(idService: number, idAttribute: number): void {
    this.services.forEach((service) => {
      if (service.id_service === idService) {
        remove(service.attributeServiceList, { id_att_service: idAttribute });
      }
    });
    this.onChangeServices();
  }

  onChangeServices(): void {
    this.changeServices.emit(this.services);
  }

  onServiceDelete(idService: number): void {
    this.deleteService.emit(idService);
  }

  onSaveService(service: SiteService): void {
    this.editingServices.set(service.id_service, false);
    this.saveService.emit(service);
  }

  onCancelServiceUpdates(service: SiteService): void {
    this.editingServices.set(service.id_service, false);
    this.cancelServiceUpdates.emit(service);
  }

  ngOnDestroy(): void {
    this.availableAttributesSub?.unsubscribe();
  }
}
