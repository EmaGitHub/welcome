import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import {SiteServicesRoutingModule} from './site-services-routing.module';
import {SiteServicesComponent} from './site-services.component';


@NgModule({
    declarations: [
        SiteServicesComponent
    ],
    imports: [
        CommonModule,
        SiteServicesRoutingModule,
        SharedModule
    ]
})
export class SiteServicesModule { }
