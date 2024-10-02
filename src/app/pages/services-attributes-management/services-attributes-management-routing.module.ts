import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesAttributesManagementComponent } from './services-attributes-management.component';


const routes: Routes = [
    {path : '', component : ServicesAttributesManagementComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesAttributesManagementRoutingModule { }
