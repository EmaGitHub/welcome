import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SitesManagementRoutingModule } from './sites-management-routing.module';
import { SitesManagementComponent } from './sites-management.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { BuildingManagerSelectionDialogComponent } from './building-manager-selection-dialog/building-manager-selection-dialog.component';


@NgModule({
    declarations: [
        SitesManagementComponent,
        ServicesSectionComponent,
        BuildingManagerSelectionDialogComponent
    ],
    imports: [
        CommonModule,
        SitesManagementRoutingModule,
        SharedModule
    ]
})
export class SitesManagementModule { }
