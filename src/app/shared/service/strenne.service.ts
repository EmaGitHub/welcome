import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestResponse } from '../model/message';
import { GET, POST, PUT } from '../constants/api';
import { LoggedUser } from '../model/logged-user.model';
import { Profile } from '../model/profile.model';
import { UserRoleType } from '../constants/UserRoleType';
import { UserRole } from '../model/user-role.model';
import { ExtendedStrennaDTO } from '../model/extended-strenna.model';


@Injectable({
    providedIn: 'root'
})
export class StrenneService extends BaseService {

    getReceptionistMail(params): any {
        return this.dispatchRestCall(GET.getReceptionistMail, {
            params
        }).pipe();
    }


    addStrenna(extendedStrenna) {
        return this.dispatchRestCall(POST.insertStrenna, {
            data: { ...extendedStrenna }
        });
    }
    updateStrenna(extendedStrennaResponse) {

        return this.dispatchRestCall(PUT.updateStrenna, {

            data: { ...extendedStrennaResponse }

        });

    }


    getStrenneForUser(max_rows: string = null, page: string = null) {
        const params = {};
        if (!!max_rows) { params['max_rows'] = max_rows; }
        if (!!page) { params['page'] = page; }
        return this.dispatchRestCall(GET.getStrenneForUser, {
            params
        });
    }

    getFilteredStrenneAdmin(id_receiver: string = null, id_strenna: string = null, is_director: string = null, sender: string = null, handling: string = null,
        method: string = null, strenna_type: string = null, bulky: string = null, perishable: string = null, date: string = null,
        withdrawal_date: string = null, status: string = null, max_rows: string = null, page: string = null , periods : string[] = null)  {
        const params = {};
        if (!!id_receiver) { params['id_receiver'] = id_receiver; }
        if (!!id_strenna) { params['id_strenna'] = id_strenna; }
        if (!!is_director) { params['is_director'] = is_director; }
        if (!!sender) { params['sender'] = sender; }
        if (!!handling) { params['handling'] = handling; }
        if (!!method) { params['method'] = method; }
        if (!!strenna_type) { params['strenna_type'] = strenna_type; }
        if (!!bulky) { params['bulky'] = bulky; }
        if (!!perishable) { params['perishable'] = perishable; }
        if (!!date) { params['date'] = date; }
        if (!!withdrawal_date) { params['withdrawal_date'] = withdrawal_date; }
        if (!!status) { params['status'] = status; }
        if (!!max_rows) { params['max_rows'] = max_rows; }
        if (!!page) { params['page'] = page; }
        if (!!periods) { params['periods'] = periods; }
        return this.dispatchRestCall(GET.getFilteredStrenneAdmin, {
            params
        });
    }

    getFilteredStrenneForUser(id_strenna: string, sender: string, actual_withdrawal_date: string, status: string, max_rows: string = null, page: string = null) {
        const params = {};
        if (!!id_strenna) { params['id_strenna'] = id_strenna; }
        if (!!sender) { params['sender'] = sender; }
        if (!!actual_withdrawal_date) { params['strenna_date'] = actual_withdrawal_date; }
        if (!!status) { params['status'] = status; }
        if (!!max_rows) { params['max_rows'] = max_rows; }
        if (!!page) { params['page'] = page; }
        return this.dispatchRestCall(GET.getFilteredStrenneForUser, {
            params
        });
    }

    handleStrennaForUser(strennaResponse) {
        return this.dispatchRestCall(POST.handleStrennaForUser, {
            data: { ...strennaResponse }
        });
    }

    generateRemainderEmail(strenneIdList){
        const params = {};
        params['strenne_id_list'] = strenneIdList
        return this.dispatchRestCall(PUT.generateRemainderStrenna, {
            params
        }); 
    }

    refuseStrennaByIdForAdmin(strennaId){
        const params= {};
        params['strenna_id'] = strennaId;
        return this.dispatchRestCall(PUT.refuseStrennaByIdForAdming, {
            params
        }); 
    }

    generateExcelForAdmin(id_receiver: string = null, id_strenna: string = null, is_director: string = null, sender: string = null, handling: string = null,
        method: string = null, strenna_type: string = null, bulky: string = null, perishable: string = null, date: string = null,
        withdrawal_date: string = null, status: string = null, periods : string[] = null)  {
        const params = {};
        if (!!id_receiver) { params['id_receiver'] = id_receiver; }
        if (!!id_strenna) { params['id_strenna'] = id_strenna; }
        if (!!is_director) { params['is_director'] = is_director; }
        if (!!sender) { params['sender'] = sender; }
        if (!!handling) { params['handling'] = handling; }
        if (!!method) { params['method'] = method; }
        if (!!strenna_type) { params['strenna_type'] = strenna_type; }
        if (!!bulky) { params['bulky'] = bulky; }
        if (!!perishable) { params['perishable'] = perishable; }
        if (!!date) { params['date'] = date; }
        if (!!withdrawal_date) { params['withdrawal_date'] = withdrawal_date; }
        if (!!status) { params['status'] = status; }
        if (!!periods) { params['periods'] = periods; }
        return this.dispatchRestCall(GET.generateExcelForAdmin, {
            params
        });
    }
    
    getDefaultProfile(){
        const params= {};
        return this.dispatchRestCall(GET.getDefaultProfile, {}); 
    }

    getSlotOfWeek(){
        return this.dispatchRestCall(GET.getSlotOfWeek, {});
    }


    getAvailablePeriods(){
        return this.dispatchRestCall(GET.getAvailablePeriods, {}); 
    }
}