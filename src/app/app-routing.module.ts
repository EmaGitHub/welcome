import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditStennaComponent } from './pages/edit-stenna/edit-stenna.component';
import { DetailsStrennaUserComponent } from './pages/user-page/details-strenna-user/details-strenna-user.component';
import { ManageCurrentStrennaComponent } from './pages/user-page/manage-current-strenna/manage-current-strenna.component';
import { UserHistoryComponent } from './pages/user-page/user-history/user-history.component';
import { StrennaDetailsComponent } from './shared/components/strenna-details/strenna-details.component';
import { AdminManagementResolver } from './shared/resolvers/admin-management.resolver';
import { ProfileResolver } from './shared/resolvers/profile.resolver';
import { SaManagementResolver } from './shared/resolvers/sa-management.resolver';
import { SiteManagementResolver } from './shared/resolvers/site-management.resolver';
import { StrenneManagementResolver } from './shared/resolvers/strenne-management.resolver';
import { UserDispatcherResolver } from './shared/resolvers/user-dispatcher-management.resolver';
import { UserHomeResolver } from './shared/resolvers/user-home.resolver';
import { UserPageResolver } from './shared/resolvers/user-page-resolver';

const routes: Routes = [

    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'app-user-dispatcher',
        loadChildren: () => import('./pages/user-dispatcher/user-dispatcher.module')
            .then(m => m.UserDispatcherModule),
        resolve: {
            profile: ProfileResolver,
            userdispatcherManagement: UserDispatcherResolver
        }
    }
    , {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module')
            .then(m => m.HomeModule),
        resolve: {
            profile: ProfileResolver,
            userHomeResolver : UserHomeResolver 

        }
    }, {
        path: 'strenne-management',
        loadChildren: () => import('./pages/strenne-management/strenne-management.module')
            .then(m => m.StrenneManagementModule),
        resolve: {
            profile: ProfileResolver,
            strenneManagement: StrenneManagementResolver,
        }
    }, {
        path: 'sites-management',
        loadChildren: () => import('./pages/sites-management/sites-management.module')
            .then(m => m.SitesManagementModule),
        resolve: {
            profile: ProfileResolver,
            siteManagement: SiteManagementResolver
        }
    }, {
        path: 'service-attribute-management',
        loadChildren: () => import('./pages/services-attributes-management/services-attributes-management.module')
            .then(m => m.ServicesAttributesManagementModule),
        resolve: {
            profile: ProfileResolver,
            saManagement: SaManagementResolver
        }
    }, {
        path: 'admins-management',
        loadChildren: () => import('./pages/admins-management/admins-management.module')
            .then(m => m.AdminsManagementModule),
        resolve: {
            profile: ProfileResolver,
            adminManagement: AdminManagementResolver
        }
    }, {
        path: 'add-services',
        loadChildren: () => import('./pages/add-services/add-services.module')
            .then(m => m.AddServicesModule),
        resolve: {
            profile: ProfileResolver,
            siteManagement: SiteManagementResolver
        }
    },

    {
        path: 'user-page',

        loadChildren: () => import('./pages/user-page/user-page.module')
            .then(m => m.UserPageModule),
        resolve: {
            profile: ProfileResolver,
            userPage: UserPageResolver
        }
    },



    { path: 'show-details', component: StrennaDetailsComponent },
    { path: 'show-details-user/:id_strenna', component: DetailsStrennaUserComponent },
    { path: 'edit-strenna', component: EditStennaComponent },
    { path: 'strenna/:id_strenna', component: ManageCurrentStrennaComponent } ,
    { path: 'history', component: UserHistoryComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
