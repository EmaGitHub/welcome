import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceAttributeCard } from './service-attribute-card.model';
import { method } from 'lodash';

@Component({
  selector: 'app-service-attribute-card',
  templateUrl: './service-attribute-card.component.html',
  styleUrls: ['./service-attribute-card.component.scss']
})
export class ServiceAttributeCardComponent implements OnInit {

  @Input() serviceAttribute: ServiceAttributeCard;
  @Input() isCategory: boolean;
  isService: boolean;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.isService = this.serviceAttribute.type === 'SERVICE' ; 

    console.log(this.serviceAttribute) ; 
  }

  editServiceAttribute() {
    this.edit.emit(this.serviceAttribute);
  }

  deleteServiceAttribute() {
    this.delete.emit(this.serviceAttribute);
  }

}
