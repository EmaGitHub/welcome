import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceAttributeType } from '../../../shared/constants/ServiceAttributeType';
import { DialogService } from '../../../shared/service/dialog.service';
import { AddServiceAttributeType } from '../add-service-attribute/service-attribute-type.model';
import { HandleServiceAttributeDialogComponent } from '../handle-service-attribute-dialog/handle-service-attribute-dialog.component';
import { Attribute } from '../model/attribute.model';
import { ServiceAttributeCard } from '../service-attribute-card/service-attribute-card.model';
import { ServiceAttributeService } from '../services-attributes-management.service';

@Component({
  selector: 'app-attribute-management',
  templateUrl: './attribute-management.component.html',
  styleUrls: ['./attribute-management.component.scss']
})
export class AttributeManagementComponent implements OnInit, OnDestroy {

  attributes: Attribute[];
  filteredAttributes: Attribute[];
  attributesSub: Subscription;
  saveServiceAttributeDoneSub: Subscription;
  confirmDialogSub: Subscription;
  filterText: string;

  type: AddServiceAttributeType = {
    searchTitle: 'saManagement.attribute',
    searchPlaceholder: 'saManagement.searchAttribute',
    button: 'saManagement.newAttribute'
  };

  constructor(private serviceAttributeService: ServiceAttributeService,
              private dialog: MatDialog,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.serviceAttributeService.getAllAttributes();

    this.attributesSub = this.serviceAttributeService.attributes
        .subscribe((attributes) => {
          this.attributes = attributes;
          this.filteredAttributes = attributes;
          if (this.filterText) {
            this.filterList(this.filterText);
          }
        });

    this.saveServiceAttributeDoneSub = this.serviceAttributeService.saveServiceAttributeDone.subscribe(() => {
      setTimeout(() => {
        this.dialogService.openSuccessDialog('saManagement.saveAttributeSuccess');
      }, 500);
      this.serviceAttributeService.getAllAttributes();
    });
  }


  filterList(filter: string) {
    this.filterText = filter;
    if (this.filterText) {
      this.filteredAttributes = this.attributes.filter((attribute: Attribute) => {
        return attribute.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;
      });
    } else {
      this.filteredAttributes = this.attributes;
    }
  }

  addAttribute() {
    this.dialog.open(HandleServiceAttributeDialogComponent, {
      id: 'handle-service-attribute',
      maxWidth: '800px',
      data: {
        type: ServiceAttributeType.ATTRIBUTE
      }
    });
  }

  editAttribute(serviceAttributeCard: ServiceAttributeCard) {
    // tslint:disable-next-line:variable-name
    const attribute: Attribute = this.attributes.find((_attribute: Attribute) => {
      return _attribute.id_att_service === serviceAttributeCard.id;
    });
    this.dialog.open(HandleServiceAttributeDialogComponent, {
      id: 'handle-service-attribute',
      maxWidth: '800px',
      data: {
        serviceAttribute: attribute,
        type: ServiceAttributeType.ATTRIBUTE
      }
    });
  }

  deleteAttribute(serviceAttributeCard: ServiceAttributeCard) {
    this.dialogService.openConfirmDialog('saManagement.confirmAttributeDelete', {attribute: serviceAttributeCard.name}, serviceAttributeCard);
    if (!this.confirmDialogSub || this.confirmDialogSub.closed) {
      this.confirmDialogSub = this.dialogService.confirm.subscribe((value: ServiceAttributeCard) => {
        this.serviceAttributeService.deleteAttribute(value.id).subscribe(() => {
          this.dialog.closeAll();
          this.serviceAttributeService.getAllAttributes();
          this.confirmDialogSub.unsubscribe();
          setTimeout(() => {
            this.dialogService.openSuccessDialog('saManagement.deleteAttributeSuccess');
          }, 500);
        });
      });
    }
  }

  getAttribute(attribute: Attribute): ServiceAttributeCard {
    return {
      icon: attribute.icon,
      name: attribute.name,
      id: attribute.id_att_service,
      language: attribute.language,
      is_deleted: attribute.is_deleted,
      type: ServiceAttributeType.ATTRIBUTE , 
    };
  }

  ngOnDestroy(): void {
    this.attributesSub?.unsubscribe();
    this.saveServiceAttributeDoneSub?.unsubscribe();
  }

}
