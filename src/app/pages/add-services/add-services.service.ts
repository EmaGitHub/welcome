import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BaseService} from '../../shared/service/base.service';
import {GET, POST, PUT} from '../../shared/constants/api';
import {RestResponse} from '../../shared/model/message';
import {Service} from '../services-attributes-management/model/service.model';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {SiteService} from '../../shared/model/site-service.model';
import * as _ from 'lodash';
import {DialogService} from '../../shared/service/dialog.service';


@Injectable({
    providedIn: 'root'
})
export class AddServicesService extends BaseService{

    // tslint:disable-next-line:variable-name
    private _deltaServices: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>([]);
    public readonly deltaServices: Observable<Service[]> = this._deltaServices.asObservable();

    // tslint:disable-next-line:variable-name
    private _newSiteServices: BehaviorSubject<SiteService[]> = new BehaviorSubject<SiteService[]>([]);
    public readonly newSiteServices: Observable<SiteService[]> = this._newSiteServices.asObservable();

    constructor(http: HttpClient, private translateService: TranslateService, private dialogService: DialogService) {
        super(http);
    }

    getDeltaServices(idSite): void {
        this.dispatchRestCall(GET.deltaServices, {
            pathParams: {
                idSite,
                lang: this.translateService.currentLang.toUpperCase()
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<any>) => {
                    const services: Service[] = response.output;
                    this._deltaServices.next(services);
                },
                err => {
                    console.error('Delta services not found!!', err);
                    this.dialogService.openErrorDialog();
                });

    }

    setNewSiteServices(service: SiteService[]): void {
        this._newSiteServices.next(service);
    }

    saveSiteServices(idSite: number, services: SiteService[]) {
        const dataServices = _.map(services, (s) => {
            return {
                idService: s.id_service,
                attributeValueDtoList: _.map(s.attributeServiceList, (a) => {
                    return {
                        idAttribute: a.id_att_service,
                        value: a.value
                    };
                })
            };
        });
        return this.dispatchRestCall(POST.saveSiteService, {
            data: {
                idSite,
                language: this.translateService.currentLang.toUpperCase(),
                serviceIdAndAttributeListDtoList: dataServices
            }
        }).pipe();
    }
}
