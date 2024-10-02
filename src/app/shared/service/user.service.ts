import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRoleType } from '../constants/UserRoleType';
import { GET } from '../constants/api';
import { LoggedUser } from '../model/logged-user.model';
import { RestResponse } from '../model/message';
import { Profile } from '../model/profile.model';
import { UserRole } from '../model/user-role.model';
import { BaseService } from './base.service';


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService{

    private expiredSession = new BehaviorSubject<boolean>(false);

    // tslint:disable-next-line:variable-name
    private _profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
    public readonly profile: Observable<Profile> = this._profile.asObservable();

    // tslint:disable-next-line:variable-name max-line-length
    private _userRoles: BehaviorSubject<UserRole> = new BehaviorSubject<UserRole>(null);
    public readonly userRoles: Observable<UserRole> = this._userRoles.asObservable();

    public getCurrentUser(fromIdp): void {
        this._profile.next(null);
        const service = fromIdp ? GET.userIDP : GET.user;
        this.dispatchRestCall(service).pipe().subscribe((response: RestResponse<LoggedUser>) => {
            const user: LoggedUser = response.output;
            if (window.location.origin.indexOf('localhost') > -1 ||window.location.origin.indexOf('dev') > -1 ||window.location.origin.indexOf('qa')  > -1) {
                user.user = localStorage.getItem('LOCAL_USER');
                    if (!user.user) {
                        user.user = 'A461026'; // EMILIANO;
                        // user.user = 'A473477'; // IO;
                        // user.user = 'A469715'; // MARIO
                    }
                }
                this.searchInternalProfilesById({ userid: user.user })
                .subscribe(
                    (employeeResponse: RestResponse<Profile>) => {
                        const profile: Profile = employeeResponse.output;
                        this._profile.next(profile);
                    },
                    err => {
                        //If the user is not found find on external users
                        if(err.status == "404"){
                            this.searcExternalProfilesById({ userid: user.user })
                            .subscribe(
                                (response) => {
                                    const profile: Profile = response.output[0];
                                    this._profile.next(profile);
                                },
                                err => {
                                    this.searcExternalProfilesById
                                    console.error('Profile Not Found!!', err);
                                });
                        }else{
                            console.error('Error while getting Profile!!', err);
                        }
                    });           
        });
    }



    searchProfile(params) {
        return this.dispatchRestCall(GET.searchProfile, {
            params
        }).pipe();
    }

    searchInternalProfiles(params) {
        return this.dispatchRestCall(GET.searchProfilesInternal, {
            params
        }).pipe();
    }

    searchInternalProfilesById(params) {
        return this.dispatchRestCall(GET.searchProfilesInternalById, {
            params
        }).pipe();
    }

    getProfile(): Profile {
        return this._profile.getValue();
    }

    retrieveRoleForUser() {
        this.dispatchRestCall(GET.getRoleForUser).pipe()
            .subscribe(
                (response: RestResponse<UserRoleType[]>) => {

               
                    
                    const isGlobalAdmin = response.output.find((role) => {
                        return role === UserRoleType.ADMIN_GLOBAL;
                    });
                    const isCountryAdmin = response.output.find((role) => {
                        return role === UserRoleType.ADMIN_COUNTRY;
                    });
                    const isSiteAdmin = response.output.find((role) => {
                        return role === UserRoleType.ADMIN_SITE;
                    });



                    this.getCurrentUserProfiles().pipe().subscribe((response: RestResponse<any>) => {
                        const user: any = response.output;
                        var  profiles : any [] = [] ; 
                        if(response && response.output){
                            response.output.forEach(element => {
                                profiles.push(element.code) ; 
                            
                            });
                        }
                        
                        const isStrenneOperator = profiles.find((role) => {
                            return role === UserRoleType.STRENNE_OPERATOR;
                        });
                        const isStrenneAdmin = profiles.find((role) => {
                            return role === UserRoleType.STRENNE_ADMIN;
                        });

                        this.getIsStrenneUser().pipe().subscribe(
                            (
                            response: RestResponse<any[]>) => {
                                var strenneUser = response;
                                this._userRoles.next({
                                    isSiteAdmin: !!isSiteAdmin,
                                    isCountryAdmin: !!isCountryAdmin,
                                    isGlobalAdmin: !!isGlobalAdmin,
                                    isStrenneUser: !!strenneUser, 
                                    isStrenneOperator: !!isStrenneOperator,
                                    isStrenneAdmin: !!isStrenneAdmin
                                });
                            });
                    }, 
                    err => {
                        const isStrenneOperator = false;
                        const isStrenneAdmin = false;

                        this.getIsStrenneUser().pipe().subscribe(
                            (
                            response: RestResponse<any[]>) => {
                                var strenneUser = response;
                                this._userRoles.next({
                                    isSiteAdmin: !!isSiteAdmin,
                                    isCountryAdmin: !!isCountryAdmin,
                                    isGlobalAdmin: !!isGlobalAdmin,
                                    isStrenneUser: !!strenneUser, 
                                    isStrenneOperator: !!isStrenneOperator,
                                    isStrenneAdmin: !!isStrenneAdmin
                                });
                            });
                    }
                    ); 
                });
    }

    getRoleForUser(): UserRole {
        return this._userRoles.getValue();
        // currroles = new UserRoleType() ; 
        // return 
    }

    getIsStrenneUser(): any{
        return this.dispatchRestCall(GET.getIsStrenneUser);
    }

    getSession() {
        return this.expiredSession.asObservable();
    }

    resetSession() {
        this.expiredSession.next(false);
    }

    getCurrentUserProfiles () { 
        return this.dispatchRestCall(GET.getProfiles) ; 

    }
    
    searcExternalProfilesById(params) {
        return this.dispatchRestCall(GET.searchProfilesExternalById, {
            params
        }).pipe();
    }
}