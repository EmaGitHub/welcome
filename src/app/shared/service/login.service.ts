import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    apiUrl = '/saml/login';

    constructor(
        private readonly authService: AuthService
    ) {
    }

    async load(): Promise<any> {
        return new Promise((resolveFn, rejectFn) => {

            this.authService.isLogged().then(isLoggedIn => {
                if (isLoggedIn) {
                    // console.log('Continue initializing app..');
                    // console.log('finestra:', window.opener);
                    if (window?.opener){
                        window.opener.postMessage('loggedIn', '*');
                    }
                    resolveFn(true);
                } else {
                    // console.log('redirect to login-page..');
                    setTimeout(() => {
                        window.location.assign(environment.base_url + this.apiUrl);
                    }, 500);
                    rejectFn(false);
                }
            });
        });
    }

}
