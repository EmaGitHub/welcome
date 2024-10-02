import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AddServiceAttributeComponent } from './add-service-attribute/add-service-attribute.component';
import { AttributeManagementComponent } from './attribute-management/attribute-management.component';
import { HandleServiceAttributeDialogComponent } from './handle-service-attribute-dialog/handle-service-attribute-dialog.component';
import { ServiceAttributeCardComponent } from './service-attribute-card/service-attribute-card.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { ServicesAttributesManagementRoutingModule } from './services-attributes-management-routing.module';
import { ServicesAttributesManagementComponent } from './services-attributes-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        ServicesAttributesManagementComponent,
        AddServiceAttributeComponent,
        ServiceManagementComponent,
        AttributeManagementComponent,
        ServiceAttributeCardComponent,
        HandleServiceAttributeDialogComponent , 
        CategoryManagementComponent , 
        
    ],
    imports: [
        CommonModule,
        ServicesAttributesManagementRoutingModule,
        SharedModule, 
        MatMenuModule
    ]
})
export class ServicesAttributesManagementModule { }
