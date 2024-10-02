import { Injectable } from '@angular/core';
import { Session } from '../model/message';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { GET } from '../constants/api';

@Injectable({
    providedIn: 'root'
})
export class SessionService extends BaseService {

    private expiredSession = new BehaviorSubject<boolean>(false);

    public isSessionExpiredMock() {
        return this.dispatchRestCall(GET.session).pipe();
    }

    public isSessionExpired() {
        // da rivedere
        // return this.service.get<any>('/', 'Shibboleth.sso/Session');
    }

    init(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(true);
            // this.isSessionExpiredMock()
            //     .pipe()
            //     .subscribe(
            //         (response: Session) => {
            //             this.expiredSession.next((response && response.expiration) > 0 ? false : true);
            //             if (this.expiredSession.value) {
            //             this.router.navigate(['/'])
            //                  .then(() => {
            //                      window.location.reload();
            //                  });
            //             }
            //             resolve(true);
            //         });
        });
    }
}
