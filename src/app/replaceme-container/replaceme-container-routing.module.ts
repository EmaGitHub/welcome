import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReplacemeContainerComponent} from './replaceme-container.component';

const routes: Routes = [
    {
        path: '', component: ReplacemeContainerComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ReplacemeContainerRoutingModule { }
