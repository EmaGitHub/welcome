import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SolutionInterceptor} from '../shared/interceptor/solution.interceptor';
import {SessionInterceptor} from '../shared/interceptor/session.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SolutionInterceptor, multi: true},
];

export * from '../shared/service/spinner.service';
