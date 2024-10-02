import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationComponent} from './application.component';
import {ApplicationRoutingModule} from './application-routing.module';
import {FormsModule} from '@angular/forms';
import {SpinnerComponent} from '../spinner/spinner.component';
import {ReplacemeContainerModule} from '../replaceme-container/replaceme-container.module';
import {FeprofilerContainerModule} from '../feprofiler-container/feprofiler-container.module';

@NgModule({
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        FormsModule,
        ReplacemeContainerModule,
        FeprofilerContainerModule
    ],
    declarations: [
        ApplicationComponent, SpinnerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApplicationModule {}
