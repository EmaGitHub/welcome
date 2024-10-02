import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FeprofilerContainerComponent} from './feprofiler-container.component';
import {FeprofilerRoutingModule} from './feprofiler-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {TerritoryComponent} from './territory/territory.component';
import {SolutionInfoComponent} from './solution-info/solution-info.component';
import {ActivityComponent} from './activity/activity.component';
import {UserComponent} from './users/users.component';
import {AbilitationComponent} from './abilitation/abilitation.component';
import {OrderByPipe} from '../shared/pipes/order-by.pipe';



@NgModule({
    declarations: [
        FeprofilerContainerComponent,
        ProfileComponent,
        TerritoryComponent,
        ActivityComponent,
        AbilitationComponent,
        SolutionInfoComponent,
        UserComponent,
        OrderByPipe
    ],
    imports: [
        CommonModule,
        FeprofilerRoutingModule,
        FormsModule
    ],
    exports: [
        FeprofilerContainerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeprofilerContainerModule {
}
