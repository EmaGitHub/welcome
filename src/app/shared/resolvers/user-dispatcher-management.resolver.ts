import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Profile } from '../model/profile.model';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserRole } from '../model/user-role.model';

@Injectable({ providedIn: 'root' })

 
export class UserDispatcherResolver implements Resolve<Profile> {

    hasRoleOnSds : boolean ;

    userDispatcherPromise = new Promise((resolve, reject) => {
        this.userService.userRoles
            .pipe(filter(userRole => !!userRole))
            .subscribe((userRole: UserRole) => {

                this.hasRoleOnSds = (userRole.isCountryAdmin || userRole.isGlobalAdmin || userRole.isSiteAdmin) ; 
                // roleOnSds : (userRole.isCountryAdmin || userRole.isGlobalAdmin || userRole.isSiteAdmin) ; 

                // console.log(
                //     "this.hasRoleOnSds" +  this.hasRoleOnSds + " \n" +
                //     "userRole.isCountryAdmin " + userRole.isCountryAdmin + " \n" +
                //     "userRole.isGlobalAdmin " + userRole.isGlobalAdmin + " \n" +
                //     "userRole.isSiteAdmin " + userRole.isSiteAdmin + " \n" +
                //     "userRole.isStrenneOperator " + userRole.isStrenneOperator + " \n" +
                //     "userRole.isStrenneAdmin " + userRole.isStrenneAdmin + " \n" +
                //     "userRole.isStrenneUser " + userRole.isStrenneUser
                // );

                if (!this.hasRoleOnSds && !(userRole.isStrenneOperator || userRole.isStrenneAdmin) && userRole.isStrenneUser) {
                    this.router.navigate(['/user-page']);
                }
                if (
                    (this.hasRoleOnSds || (userRole.isStrenneOperator || userRole.isStrenneAdmin)) && 
                 userRole.isStrenneUser) {
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
        return this.userDispatcherPromise;
    }
}
