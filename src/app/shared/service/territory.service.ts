import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {RestResponse, TerritoryCode} from '../model/message';
import {map} from 'rxjs/operators';
import {GET} from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService extends BaseService{

  public getTerritories(profile: string): Observable<RestResponse<TerritoryCode []>> {
    const params = {};
    if (profile != null){
      // @ts-ignore
      params.profile = profile;
    }
    return this.dispatchRestCall(GET.getTerritories, {
      params
    }).pipe();
  }

  public getTerritoriesCombo(): Observable<any[]> {
    return this.getTerritories(null)
        .pipe(map((response: RestResponse<TerritoryCode[]>) => response.output.map((territoryCode: TerritoryCode) => ({
          id: territoryCode.code,
          value: territoryCode.code
        }))));
  }
}
