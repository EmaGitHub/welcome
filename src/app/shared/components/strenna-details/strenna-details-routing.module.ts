import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StrennaDetailsComponent } from './strenna-details.component';


const routes: Routes = [
    {path : '', component : StrennaDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StrennaDetailsRoutingModule { }
