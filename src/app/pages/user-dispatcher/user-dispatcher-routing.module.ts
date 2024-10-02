import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDispatcherComponent } from './user-dispatcher.component';

const routes: Routes = [
    { path: '', component: UserDispatcherComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserDispatcherRoutingModule { }
