import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { httpInterceptorProviders } from './shared/components/spinner';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoginService } from './shared/service/login.service';
import { SessionService } from './shared/service/session.service';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { StrennaDetailsComponent } from './shared/components/strenna-details/strenna-details.component';
import { CustomPaginatorIntl } from './shared/custom-paginato-intl';


export function initializeApp(config: SessionService) {
    return () => config.init();
}

export function createTranslateLoader(http: HttpClient) {
//    return new TranslateHttpLoader(http,
//     isDevMode() ? '/assets/i18n/' : '/welcome/assets/i18n/',
//        '.json');
    return new TranslateHttpLoader(http,
        '/welcome/assets/i18n/',
        '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        HeaderComponent,
        FooterComponent,
        StrennaDetailsComponent ,

    ],
    imports: [

        CommonModule , 
        MatPaginatorModule , 
        MatTableModule, 
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatMenuModule,
        AppRoutingModule,
        SharedModule,
        NgbModule,
        MatExpansionModule,
        RouterModule,
        TranslateModule.forRoot({
            defaultLanguage: 'it',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        MatDialogModule , MatMenuModule,
        
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
        httpInterceptorProviders, 
        LoginService,
        { provide: APP_INITIALIZER, useFactory: initFunction, 
        deps: [LoginService], multi: true },
        { provide: LocationStrategy, useClass: PathLocationStrategy } , 
        { provide: MAT_DATE_LOCALE, useValue: localStorage.getItem('selectedLang') ? localStorage.getItem('selectedLang') :  'it-IT' }


    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


export function initFunction(config: LoginService) {
    return () => config.load();
}