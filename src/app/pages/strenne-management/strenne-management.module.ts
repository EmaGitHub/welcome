import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { NuovaStrennaFormComponent } from 'src/app/shared/components/nuova-strenna-form/nuova-strenna-form.component';
import { ReceiverListComponent } from 'src/app/shared/components/nuova-strenna-form/receiver-list/receiver-list.component';
import { StrennaDatePickerComponent } from 'src/app/shared/components/nuova-strenna-form/strenna-date-picker/strenna-date-picker.component';
import { StrenneInputTextComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-input-text/strenne-input-text.component';
import { StrenneSearchProfileComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-search-profile/strenne-search-profile.component';
import { StrenneSearchReceiverComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-search-receiver/strenne-search-receiver.component';
import { StrenneSearchSenderComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-search-sender/strenne-search-sender.component';
import { SharedModule } from '../../shared/shared.module';
import { EditStennaComponent } from '../edit-stenna/edit-stenna.component';
import { ExpansionPanelFiltersComponent } from './expansion-panel-filters/expansion-panel-filters.component';
import { StrenneManagementRoutingModule } from './strenne-management-routing.module';
import { StrenneManagementComponent } from './strenne-management.component';



@NgModule({
    declarations: [
        EditStennaComponent,
        NuovaStrennaFormComponent,
        StrenneSearchProfileComponent,
        StrenneSearchReceiverComponent,
        StrenneSearchSenderComponent,
        StrenneInputTextComponent,
        StrennaDatePickerComponent , 
        StrenneManagementComponent, 
        ReceiverListComponent, ExpansionPanelFiltersComponent
    ],
    imports: [
        MatSlideToggleModule,
        MatPaginatorModule,
        MatSortModule , 
        CommonModule,
        StrenneManagementRoutingModule,
        SharedModule,
    ],
    exports: [
        StrenneSearchSenderComponent ,
        EditStennaComponent,
        StrennaDatePickerComponent,
        StrenneInputTextComponent,
        NuovaStrennaFormComponent,
        StrenneSearchProfileComponent, 
    ] , 
    

})
export class StrenneManagementModule { }
