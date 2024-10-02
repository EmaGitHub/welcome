import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserPageComponent } from './user-page.component';
import { ManageCurrentStrennaComponent } from './manage-current-strenna/manage-current-strenna.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsStrennaUserComponent } from './details-strenna-user/details-strenna-user.component';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { UserHistoryComponent } from './user-history/user-history.component';
import { StrenneManagementModule } from '../strenne-management/strenne-management.module';

@NgModule({
  declarations: [
    UserPageComponent , 
    ManageCurrentStrennaComponent, 
    DetailsStrennaUserComponent, 
    UserHistoryComponent,
],
  imports: [
    CommonModule,
    SharedModule,
    UserPageRoutingModule,
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule , 
    MatSortModule,
    TranslateModule , 
    StrenneManagementModule
  ],
  exports : [
    
  ]
})
export class UserPageModule { }
