import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminsManagementComponent} from './admins-management.component';


const routes: Routes = [
    {path : '', component : AdminsManagementComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminsManagementRoutingModule { }
