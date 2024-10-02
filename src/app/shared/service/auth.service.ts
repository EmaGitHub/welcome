import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    apiUrl = '/FEProfiler/checkValidLogin';

    constructor(protected http: HttpClient) {}

    public isLogged(): Promise<boolean> {
        return new Promise((resolve, reject) => {
             this.http.get<boolean>(`${environment.base_url}${this.apiUrl}`).subscribe(output => {
                    resolve(output);
                },
                (err) => {
                    console.log('error on FEProfiler/checkValidLogin : ', err);
                    reject(false);
                });
        });
    }

    /**
     * @ignore
     */
    public ngOnDestroy(): void {
    }


}

