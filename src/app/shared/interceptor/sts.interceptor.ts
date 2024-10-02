import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from '../service/user.service';

@Injectable()
export class StsInterceptor implements HttpInterceptor {

    lastPing = new BehaviorSubject(null);

    constructor(private userService: UserService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const modifiedRequest = request.clone({headers: request.headers.append('Access-Control-Allow-Origin', '*')});
        const currentDate = new Date();
        if (this.lastPing.value){
            const elapsed = currentDate.getTime() - this.lastPing.value;
            // console.log('Elapsed time :' + elapsed);
            if (elapsed < 3600000) {
                this.lastPing.next(currentDate.getTime());
            }else {
                this.lastPing.next(0);
                window.location.reload();
            }
        } else {
            this.lastPing.next(new Date().getTime());
        }
        return next.handle(modifiedRequest);
    }

    interceptorRest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const modifiedRequest = request.clone({ headers : request.headers.append('Access-Control-Allow-Origin', '*')});

        if (request.url === '/Shibboleth.sso/Session') {
            return next.handle(modifiedRequest);
        }else {
            console.log('Invoked Solution service .. check Session first');
            this.userService.getSession().pipe().subscribe(source => {
                if (source) {
                    this.userService.resetSession();
                    window.location.reload();
                }
            });
        }
        return next.handle(modifiedRequest);
    }
}
