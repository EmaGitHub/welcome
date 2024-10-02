import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SolutionInterceptor} from '../../interceptor/solution.interceptor';
import {StsInterceptor} from '../../interceptor/sts.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: StsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SolutionInterceptor, multi: true},
];

export * from '../../service/spinner.service';
