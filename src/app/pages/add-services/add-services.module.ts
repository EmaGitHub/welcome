import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import {AddServicesRoutingModule} from './add-services-routing.module';
import {AddServicesComponent} from './add-services.component';
import { ServicesSelectionComponent } from './services-selection/services-selection.component';
import { ServicesDetailsComponent } from './services-details/services-details.component';
import { ServicesSummaryComponent } from './services-summary/services-summary.component';


@NgModule({
    declarations: [
        AddServicesComponent,
        ServicesSelectionComponent,
        ServicesDetailsComponent,
        ServicesSummaryComponent,
    ],
    imports: [
        CommonModule,
        AddServicesRoutingModule,
        SharedModule
    ]
})
export class AddServicesModule { }
