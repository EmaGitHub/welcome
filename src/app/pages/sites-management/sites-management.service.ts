import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { DELETE, GET, POST, PUT } from '../../shared/constants/api';
import { RestResponse } from '../../shared/model/message';
import { Profile } from '../../shared/model/profile.model';
import { SiteService } from '../../shared/model/site-service.model';
import { Site } from '../../shared/model/site.model';
import { BaseService } from '../../shared/service/base.service';
import { BuildingManagerService } from '../../shared/service/building-manager.service';
import { DialogService } from '../../shared/service/dialog.service';
import { UserService } from '../../shared/service/user.service';
import { SiteDetails } from './site-details.model';


@Injectable({
    providedIn: 'root'
})
export class SitesManagementService extends BaseService{

    // tslint:disable-next-line:variable-name
    private _availableSites: BehaviorSubject<Site[]> = new BehaviorSubject<Site[]>([]);
    public readonly availableSites: Observable<Site[]> = this._availableSites.asObservable();

    // tslint:disable-next-line:variable-name
    private _selectedSite: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly selectedSite: Observable<number> = this._selectedSite.asObservable();

    // tslint:disable-next-line:variable-name
    private _siteDetails: BehaviorSubject<SiteDetails> = new BehaviorSubject<SiteDetails>(null);
    public readonly siteDetails: Observable<SiteDetails> = this._siteDetails.asObservable();

    // tslint:disable-next-line:variable-name
    private _buildingManager: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
    public readonly buildingManager: Observable<Profile> = this._buildingManager.asObservable();

    constructor(http: HttpClient, private translateService: TranslateService, private userService: UserService,
                private dialogService: DialogService, private buildingManagerService: BuildingManagerService) {
        super(http);
    }

    setSelectedSite(idSite: number): void {
        this._selectedSite.next(idSite);
    }

    setSiteDetails(siteDetails: SiteDetails): void {
        this._siteDetails.next(siteDetails);
    }

    setSiteBuildingManager(buildingManager: Profile): void {
        this._buildingManager.next(buildingManager);
    }

    getSite(idSite: number = this._selectedSite.value): Site {
        return _.find(this._availableSites.value, {idSite});
    }

    getAvailableSites(): void {
        this.dispatchRestCall(GET.getFilteredSites).pipe()
            .subscribe(
                (response: RestResponse<Site[]>) => {
                    const sites: Site[] = response.output;
                    this._availableSites.next(sites);
                },
                err => {
                    console.error('Get available sites error!!', err);
                    this.dialogService.openErrorDialog();
                });
    }

    getSiteDetails(idSite) {
        this.dispatchRestCall(GET.siteInfo, {
            pathParams: {
                wcCode: this.getSite(idSite)?.wccode,
                lang: this.translateService.currentLang.toUpperCase()
            }
        }).pipe()
            .subscribe(
                (siteResponse: RestResponse<SiteDetails>) => {
                    const siteDetails: SiteDetails = siteResponse.output;
                    this._siteDetails.next(siteDetails);
                },
                err => {
                    console.error('Get site details error!!', err);
                    this.dialogService.openErrorDialog();
                });
    }

    getSiteBuildingManager(idSite) {
        this.buildingManagerService.getSiteBuildingManager(idSite)
            .subscribe(
                (profileResponse: RestResponse<Profile>) => {
                    const buildingManager: Profile = profileResponse.output;
                    this._buildingManager.next(buildingManager);
                },
                err => {
                    console.error('Building Manager Not Found!!', err);
                });
    }

    deleteBuildingManager(idSite) {
        return this.buildingManagerService.deleteBuildingManager(idSite);
    }

    saveBuildingManager(idSite: number, newBuildingManager: Profile) {
        const api = this._buildingManager.value ? PUT.updateSiteBuildingManager : POST.assignSiteBuildingManager;
        return this.buildingManagerService.saveBuildingManager(api, idSite, newBuildingManager);
    }

    deleteSiteService(idSite, idService) {
        return this.dispatchRestCall(DELETE.deleteSiteService, {
            pathParams: {
                idSite,
                idService
            }
        }).pipe();
    }

    updateSiteService(idSite: number, services: SiteService[]) {
        const dataServices = _.map(services, (s) => {
            return {
                idService: s.id_service,
                attributeValueDtoList: _.map(s.attributeServiceList, (a) => {
                    if(a.is_attachment){
                        return {
                            idAttribute: a.id_att_service,
                            value: a.value,
                            attachment: a.attachment
                        };                        
                    }
                    else{
                        return {
                            idAttribute: a.id_att_service,
                            value: a.value
                        };
                    }
                })
            };
        });
        return this.dispatchRestCall(PUT.updateSiteService, {
            data: {
                idSite,
                language: this.translateService.currentLang.toUpperCase(),
                serviceIdAndAttributeListDtoList: dataServices
            }
        }).pipe();
    }
}
