import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeprofilerContainerComponent} from './feprofiler-container.component';

const routes: Routes = [
    {
        path: '', component: FeprofilerContainerComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FeprofilerRoutingModule { }
