import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Profile } from '../model/profile.model';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserRole } from '../model/user-role.model';

@Injectable({ providedIn: 'root' })
export class StrenneManagementResolver implements Resolve<Profile> {

    strenneManagementPromise = new Promise((resolve, reject) => {

        this.userService.userRoles
            .pipe(filter(userRole => !!userRole))
            .subscribe((userRole: UserRole) => {
                if (userRole.isStrenneOperator || userRole.isStrenneAdmin) {
                    return resolve(true);
                } else {
                    this.router.navigate(['/home']);
                }
            });
    });

    constructor(private userService: UserService, private router: Router) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.strenneManagementPromise;
    }
}
