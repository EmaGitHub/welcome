import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SiteServicesComponent} from './site-services.component';


const routes: Routes = [
    {path : '', component : SiteServicesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteServicesRoutingModule { }
