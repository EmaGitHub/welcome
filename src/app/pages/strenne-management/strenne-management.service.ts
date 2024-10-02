import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DELETE, GET } from 'src/app/shared/constants/api';
import { BaseService } from 'src/app/shared/service/base.service';

@Injectable({
    providedIn: 'root'
})


export class StrenneManagementService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

    getFilteredStrenneList(id_receiver: string = null, id_strenna: string = null, is_director: string = null, sender: string = null, handling: string = null,
        method: string = null, strenna_type: string = null, bulky: string = null, perishable: string = null, date: string = null,
        withdrawal_date: string = null, status: string = null, max_rows: string = null, page: string = null) {

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
        return this.dispatchRestCall(GET.getFilteredStrenneList, {
            params
        });
    }

    getRecipientByName(name: string = null) {
        let params = {};
        if (!!name) { params['name'] = name; }

        return this.dispatchRestCall(GET.getRecipientByName, {
            params
        }).pipe();
    }

    getSenderByName(sender: string = null) {
        let params = {};
        if (!!sender) { params['sender'] = sender; }

        return this.dispatchRestCall(GET.getSenderByName, {
            params
        }).pipe();
    }

    deleteStrenna(strennaId: string) {
        if (strennaId) {
            return this.dispatchRestCall(DELETE.deleteStrenna, {
                pathParams: {
                    strennaId
                }
            }).pipe();
        }
    }

}