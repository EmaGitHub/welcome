import {Injectable} from '@angular/core';
import {BaseService} from '../../shared/service/base.service';
import {UserService} from '../../shared/service/user.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Booking} from './booking.model';
import {SiteDetails} from '../sites-management/site-details.model';
import {GET} from '../../shared/constants/api';
import {RestResponse} from '../../shared/model/message';
import {TranslateService} from '@ngx-translate/core';
import {Profile} from '../../shared/model/profile.model';
import {BuildingManagerService} from '../../shared/service/building-manager.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends BaseService{

    constructor(http: HttpClient, private userService: UserService, private translateService: TranslateService,
                private buildingManagerService: BuildingManagerService) {
        super(http);
    }

    // tslint:disable-next-line:variable-name
    private _userSiteDetails: BehaviorSubject<SiteDetails> = new BehaviorSubject<SiteDetails>(null);
    public readonly userSiteDetails: Observable<SiteDetails> = this._userSiteDetails.asObservable();

    // tslint:disable-next-line:variable-name
    private _userBuildingManager: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
    public readonly userBuildingManager: Observable<Profile> = this._userBuildingManager.asObservable();

    // tslint:disable-next-line:variable-name
    private _bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
    public readonly bookings: Observable<Booking[]> = this._bookings.asObservable();

    getUserSiteDetails() {
        this.dispatchRestCall(GET.siteInfo, {
            pathParams: {
                wcCode: this.userService.getProfile()?.wc_code,
                lang: this.translateService.currentLang.toUpperCase()
            }
        }).pipe()
            .subscribe(
                (siteResponse: RestResponse<SiteDetails>) => {
                    const siteDetails: SiteDetails = siteResponse.output;
                    this._userSiteDetails.next(siteDetails);
                },
                err => {
                    console.error('Get site details error!!', err);
                });
    }

    getUserBuildingManager() {
        const idSite = this._userSiteDetails.value?.id_site;
        if (idSite) {
            this.buildingManagerService.getSiteBuildingManager(this._userSiteDetails.value?.id_site)
                .subscribe(
                    (profileResponse: RestResponse<Profile>) => {
                        const buildingManager: Profile = profileResponse.output;
                        this._userBuildingManager.next(buildingManager);
                    },
                    err => {
                        console.error('Building Manager Not Found!!', err);
                    });
        }
    }

    getBookings() {
        this._bookings.next([]);
    }
}



// TODO: Remove mocks
const bookingsMock: Booking[] = [
    { activity: 'Pilates', site: 'Viale Egeo 150, Roma', date: '25/06/2022', time: '18:30'},
    { activity: 'Pilates', site: 'Via Galileo Ferraris, Napoli', date: '25/06/2022', time: '18:30'},
    { activity: 'Yoga', site: 'Viale Egeo 150, Roma', date: '25/06/2022', time: '18:30'},
];
