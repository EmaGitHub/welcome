import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { UserDispatcherComponent } from './user-dispatcher.component';
import { UserDispatcherRoutingModule } from './user-dispatcher-routing.module';


@NgModule({

    declarations: [

        UserDispatcherComponent

    ],
    imports: [

        
        UserDispatcherRoutingModule , 
        CommonModule,
        SharedModule  , 
    ] , 

    exports : [
        UserDispatcherComponent , 
    ] 
    
})
export class UserDispatcherModule { }
