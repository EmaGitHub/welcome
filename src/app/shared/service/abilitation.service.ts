import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {RestResponse} from '../model/message';
import {Observable} from 'rxjs';
import {GET} from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class AbilitationService extends BaseService{

  public isUserEnabled(activity: string, territory: string): Observable<RestResponse<boolean>> {
    const params = {};
    if (activity != null){
      // @ts-ignore
      params.activity = activity;
      if (territory != null) {
        // @ts-ignore
        params.territory = territory;
      }
    }
    return this.dispatchRestCall(GET.isUserEnabled, {
      params
    }).pipe();
  }
}
