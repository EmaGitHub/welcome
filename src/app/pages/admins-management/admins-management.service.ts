import {BaseService} from '../../shared/service/base.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {AdminsManagementType} from '../../shared/constants/AdminsManagementType';
import {DELETE, GET, POST, PUT} from '../../shared/constants/api';
import {PagedList, RestResponse} from '../../shared/model/message';
import {AdminListItem} from './admin-list-item.model';
import {Attribute} from '../services-attributes-management/model/attribute.model';

@Injectable({
    providedIn: 'root'
})
export class AdminsManagementService extends BaseService {

    // tslint:disable-next-line:variable-name max-line-length
    private _adminsManagementSelected: BehaviorSubject<AdminsManagementType> = new BehaviorSubject<AdminsManagementType>(AdminsManagementType.SITE);
    public readonly adminsManagementSelected: Observable<AdminsManagementType> = this._adminsManagementSelected.asObservable();

    // tslint:disable-next-line:variable-name max-line-length
    private _countryList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public readonly countryList: Observable<string[]> = this._countryList.asObservable();

    // tslint:disable-next-line:variable-name max-line-length
    private _cityList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public readonly cityList: Observable<string[]> = this._cityList.asObservable();

    // tslint:disable-next-line:variable-name max-line-length
    private _siteList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public readonly siteList: Observable<any> = this._siteList.asObservable();

    // tslint:disable-next-line:variable-name max-line-length
    private _adminSiteList: BehaviorSubject<PagedList<AdminListItem>> = new BehaviorSubject<PagedList<AdminListItem>>(null);
    public readonly adminSiteList: Observable<PagedList<AdminListItem>> = this._adminSiteList.asObservable();

    // tslint:disable-next-line:variable-name max-line-length
    private _adminCountryList: BehaviorSubject<PagedList<AdminListItem>> = new BehaviorSubject<PagedList<AdminListItem>>(null);
    public readonly adminCountryList: Observable<PagedList<AdminListItem>> = this._adminCountryList.asObservable();

    // tslint:disable-next-line:variable-name
    private _saveAdminDone: Subject<any> = new Subject<any>();
    public readonly saveAdminDone: Observable<any> = this._saveAdminDone.asObservable();

    constructor(http: HttpClient, private translate: TranslateService) {
        super(http);
    }

    setAdminsManagementSelected(adminsManagementType: AdminsManagementType) {
        this._adminsManagementSelected.next(adminsManagementType);
    }

    getAdminsManagementSelected(): AdminsManagementType {
        return this._adminsManagementSelected.getValue();
    }

    getAvailableCountryForAdmin() {
        this.dispatchRestCall(GET.getAvailableCountryForAdmin, {
            pathParams: {
                lang: this.translate.currentLang.toUpperCase()
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._countryList.next(response.output);
                });
    }

    getAvailableCityForAdmin(country: string = '') {
        this.dispatchRestCall(GET.getAvailableCityForAdmin, {
            params: {
                country
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._cityList.next(response.output);
                });
    }

    getAvailableSiteForAdmin(country: string = '', city: string = '') {
        this.dispatchRestCall(GET.getAvailableSiteForAdmin, {
            params: {
                country,
                city
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._siteList.next(response.output);
                });
    }

    getAdminSiteList({country = '', city = '', idSite = '', userId = '', name = '', maxRows = 10, page = 1} = {}) {
        this.dispatchRestCall(GET.getAdminSiteList, {
            params: {
                country,
                city,
                idSite,
                name,
                userId,
                'max-rows': maxRows,
                page,
                lang: this.translate.currentLang.toUpperCase()
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<PagedList<AdminListItem>>) => {
                    this._adminSiteList.next(response.output);
                });
    }

    getAdminCountryList({country = '', city = '', userId = '', name = '', maxRows = 10, page = 1} = {}) {
        this.dispatchRestCall(GET.getAdminCountryList, {
            params: {
                country,
                city,
                name,
                userId,
                'max-rows': maxRows,
                page,
                lang: this.translate.currentLang.toUpperCase()
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<PagedList<AdminListItem>>) => {
                    this._adminCountryList.next(response.output);
                });
    }

    saveSiteAdmin(admin): void {
        this.dispatchRestCall(POST.saveSiteAdmin, {
            data: admin
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._saveAdminDone.next({
                        action: 'SAVE',
                        response
                    });
                });
    }

    saveCountryAdmin(admin): void {
        this.dispatchRestCall(POST.saveCountryAdmin, {
            data: admin
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._saveAdminDone.next({
                        action: 'SAVE',
                        response
                    });
                });
    }

    deleteCountryAdmin(admin): void {
        this.dispatchRestCall(DELETE.deleteCountryAdmin, {
            data: admin
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._saveAdminDone.next({
                        action: 'DELETE',
                        response
                    });
                });
    }

    deleteSiteAdmin(admin): void {
        console.log('ADMINLIST', admin);
        this.dispatchRestCall(DELETE.deleteSiteAdmin, {
            data: admin
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    this._saveAdminDone.next({
                        action: 'DELETE',
                        response
                    });
                });
    }
}
