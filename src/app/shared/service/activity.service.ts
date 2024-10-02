import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Code, RestResponse, TerritoryCode} from '../model/message';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GET} from '../constants/api';

@Injectable({
    providedIn: 'root'
})
export class ActivityService extends BaseService{

    public userActivitySubject = new BehaviorSubject<string[]>([]);

    public getActivities(territory: string): Observable<RestResponse<Code []>> {
        const params = {};
        if (territory != null) {
            // @ts-ignore
            params.territory = territory;
        }
        return this.dispatchRestCall(GET.getActivities, {
            params
        }).pipe();
    }

    public getUserActivities() {
        return this.getActivities(null)
            .pipe(map(response => response.output.map(item => item.code)))
            .subscribe(result => this.userActivitySubject.next(result));
    }

    public getActivityCombo(): Observable<any[]> {
        return this.getActivities(null)
            .pipe(map((response: RestResponse<Code[]>) =>
                response.output.map(item => ({
                    id: item.code,
                    value: item.code
                }))
            ));
    }

    userActivities() {
        return this.userActivitySubject.asObservable();
    }
}
