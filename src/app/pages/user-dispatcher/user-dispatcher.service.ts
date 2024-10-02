import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { BuildingManagerService } from 'src/app/shared/service/building-manager.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { UserService } from 'src/app/shared/service/user.service';


@Injectable({
    providedIn: 'root'
})


export class UserDispatcherService extends BaseService{

    constructor(http: HttpClient, private translateService: TranslateService, private userService: UserService,
        private dialogService: DialogService, private buildingManagerService: BuildingManagerService) {
super(http);
}

}