import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import {SiteActivitiesRoutingModule} from './site-activities-routing.module';
import {SiteActivitiesComponent} from './site-activities.component';


@NgModule({
    declarations: [
        SiteActivitiesComponent
    ],
    imports: [
        CommonModule,
        SiteActivitiesRoutingModule,
        SharedModule
    ]
})
export class SiteActivitiesModule { }
