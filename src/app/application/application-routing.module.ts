import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ApplicationComponent} from './application.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: ApplicationComponent, children: [
                    {
                        path: '', redirectTo: 'feprofiler', pathMatch: 'full'
                    },
                    {
                        path: 'feprofiler',
                        loadChildren: () => import('.././feprofiler-container/feprofiler-container.module')
                            .then(m => m.FeprofilerContainerModule)
                    },
                    {
                        path: 'replaceme',
                        loadChildren: () => import('.././replaceme-container/replaceme-container.module')
                            .then(m => m.ReplacemeContainerModule)
                    }

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ApplicationRoutingModule {
}



