import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Profile} from '../model/profile.model';
import {Injectable} from '@angular/core';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {UserRole} from '../model/user-role.model';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<Profile> {

    profilePromise = new Promise((resolve, reject) => {
        this.userService.profile
            .pipe(filter(profile => !!profile))
            .subscribe((profile: Profile) => {
                this.userService.userRoles
                    .pipe(filter(userRoles => !!userRoles))
                    .subscribe((userRoles: UserRole) => {             
                        resolve(true);
                    });
            });
    });

    constructor(private userService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.profilePromise;
    }
}
