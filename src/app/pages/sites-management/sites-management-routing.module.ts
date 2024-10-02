import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitesManagementComponent } from './sites-management.component';


const routes: Routes = [
    { path: '', component: SitesManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SitesManagementRoutingModule { }
