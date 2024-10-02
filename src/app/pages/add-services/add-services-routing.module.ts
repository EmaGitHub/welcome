import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddServicesComponent} from './add-services.component';


const routes: Routes = [
    {path : '', component : AddServicesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddServicesRoutingModule { }
