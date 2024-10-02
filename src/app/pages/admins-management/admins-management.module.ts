import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { AdminsManagementComponent } from './admins-management.component';
import { AdminsManagementRoutingModule } from './admins-management-routing.module';
import { AdminsFiltersComponent } from './admins-filters/admins-filters.component';
import { AdminsTableComponent } from './admins-table/admins-table.component';
import { AddAdminDialogComponent } from './add-admin-dialog/add-admin-dialog.component';


@NgModule({
    declarations: [
        AdminsManagementComponent,
        AdminsFiltersComponent,
        AdminsTableComponent,
        AddAdminDialogComponent
    ],
    imports: [
        CommonModule,
        AdminsManagementRoutingModule,
        SharedModule
    ]
})
export class AdminsManagementModule { }
