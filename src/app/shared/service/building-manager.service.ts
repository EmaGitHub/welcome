import { Injectable } from '@angular/core';
import {DELETE, GET} from '../constants/api';
import {Profile} from '../model/profile.model';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {RestResponse} from '../model/message';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BuildingManagerService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

    getSiteBuildingManager(idSite) {
        return this.dispatchRestCall(GET.getBuildingManagerUsername, {
            pathParams: {
                idSite
            }
        }).pipe(
            flatMap((response: RestResponse<any>) => {
                const userid = response.output;
                if (userid) {
                    return this.dispatchRestCall(GET.searchProfile, {
                        params: {
                            userid
                        }
                    }).pipe();
                }
                return new Observable();
            })
        );
    }

    deleteBuildingManager(idSite) {
        return this.dispatchRestCall(DELETE.deleteSiteBuildingManager, {
            pathParams: {
                idSite
            }
        }).pipe();
    }

    saveBuildingManager(api, idSite: number, buildingManager: Profile) {
        return this.dispatchRestCall(api, {
            pathParams: {
                idSite,
                userId: buildingManager.userid_1
            }
        }).pipe();
    }
}
