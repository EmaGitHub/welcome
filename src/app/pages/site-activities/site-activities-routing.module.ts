import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SiteActivitiesComponent} from './site-activities.component';


const routes: Routes = [
    {path : '', component : SiteActivitiesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteActivitiesRoutingModule { }
