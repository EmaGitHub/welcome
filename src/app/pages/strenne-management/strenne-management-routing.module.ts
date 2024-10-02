import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StrenneManagementComponent } from './strenne-management.component';

const routes: Routes = [
    { path: '', component: StrenneManagementComponent  , 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] , 
    
})
export class StrenneManagementRoutingModule { }
