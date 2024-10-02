import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpinnerService} from '../service/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {mock} from '../../../mock-data/mock';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {DialogService} from '../service/dialog.service';

@Injectable()
export class SolutionInterceptor implements HttpInterceptor {

    // private requests: HttpRequest<any>[] = [];

    constructor(private spinnerService: SpinnerService, private dialog: MatDialog, private liveAnnouncer: LiveAnnouncer,
                private dialogService: DialogService) {
    }

    /*
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.spinnerService.isLoading.next(this.requests.length > 0);
        if (!(this.requests.length > 0)) {
            this.liveAnnouncer.announce('Caricamento terminato');
        }
    }
    */

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = req.clone({headers: req.headers.append('Access-Control-Allow-Origin', '*')});
        this.spinnerService.appendRequest(modifiedRequest);
        /*
        this.requests.push(modifiedRequest);
        this.spinnerService.isLoading.next(true);
        this.liveAnnouncer.announce('Caricamento');
         */
        return Observable.create(observer => {
            const subscription = next.handle(modifiedRequest)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.spinnerService.removeRequest(modifiedRequest);
                            observer.next(event);
                        }
                    },
                    err => {
                        if (!environment.production && environment['mock']) {
                            const event = new HttpResponse({
                                body: mock[modifiedRequest.url],
                                status: 200
                            });
                            this.spinnerService.removeRequest(modifiedRequest);
                            observer.next(event);
                        } else {
                            this.spinnerService.removeRequest(modifiedRequest);
                            observer.error(err);
                            this.handleError(modifiedRequest, err);
                        }
                    },
                    () => {
                        this.spinnerService.removeRequest(modifiedRequest);
                        observer.complete();
                    });

            return () => {
                this.spinnerService.removeRequest(modifiedRequest);
                subscription.unsubscribe();
            };
        });
    }


    private handleError(req: HttpRequest<any>, err: HttpErrorResponse) {
        let errorMsg;
        if (err.status === 500){
        } else if (err.status === 403 || err.status === 500 || err.status === 503) {
            if(err.status === 403  && req.url.indexOf("get-FEP-profiles") !== -1){
                //not show the error dialog
            }else{
                const errorCode = err.headers.get('SECPLT_AUTH_ERROR');
                switch (errorCode) {
                    case 'SECPLT003': {
                        errorMsg = 'User ' + req.headers.get('REMOTE_USER') + ' not authorized to perform the operation';
                        break;
                    }
                    default : {
                        errorMsg = 'error.generic';
                        break;
                    }
                }
                this.dialogService.openErrorDialog(errorMsg);
            }
        }
    }

}
