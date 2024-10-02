import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceAttribute} from '../../../model/service-attribute.model';
import {SiteService} from '../../../model/site-service.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-attributes-dialog',
  templateUrl: './add-attributes-dialog.component.html',
  styleUrls: ['./add-attributes-dialog.component.css']
})
export class AddAttributesDialogComponent implements OnInit {
  @ViewChild('select') select: MatSelect;
  selectedAttributes: ServiceAttribute[] = [];

  constructor(private dialogRef: MatDialogRef<AddAttributesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: {availableAttributes: ServiceAttribute[], service: SiteService}) { }

  ngOnInit(): void {
    if (this.dialogData.availableAttributes?.length && this.dialogData.service?.attributeServiceList?.length) {
      setTimeout(() => {
        this.preselectAttributes(this.dialogData.service.attributeServiceList);
      });
    }
  }

  preselectAttributes(attributes: ServiceAttribute[]): void {
    this.selectedAttributes = attributes;
    this.select.options.forEach(option => {
      const attr = attributes.find(a => a.id_att_service === option.value.id_att_service);
      if (attr) {
        option.select();
      }
    });
  }

  removeAttr(attr): void {
    const index = this.selectedAttributes.indexOf(attr);

    if (index >= 0) {
      this.selectedAttributes.splice(index, 1);
      this.select.options.find(option => option.value.id_att_service === attr.id_att_service)?.deselect();
    }
  }

  onConfirm(): void {
    this.selectedAttributes.forEach((attr) => {
      const attribute = _.find(this.dialogData.service.attributeServiceList, {id_att_service: attr.id_att_service});
      if (attribute) {
        attr.value = attribute.value;
        if(attribute.is_attachment){
          attr.attachment = attribute.attachment;
        }
      }
    });
    const service = {...this.dialogData.service, ...{attributeServiceList: this.selectedAttributes}};
    this.dialogRef.close(service);
  }
}
