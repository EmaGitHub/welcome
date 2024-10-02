import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/service/user.service";
import {ProfileService} from "../shared/service/profile.service";
import {TerritoryService} from "../shared/service/territory.service";
import {UserData} from '../shared/model/message';

@Component({
    selector: 'app-feprofiler-container',
    templateUrl: './feprofiler-container.component.html',
    styleUrls: ['./feprofiler-container.component.css']
})
export class FeprofilerContainerComponent implements OnInit {

    data = [];

    profiles = [];

    territories = [];


    userData: UserData;

    userDataFromIdp: UserData;

    territoriesCombo: any[];

    constructor(private userService: UserService,
                private profileService: ProfileService,
                private territoryService: TerritoryService) {
    }

    ngOnInit(): void {
        this.territoryService.getTerritoriesCombo().subscribe(territories => this.territoriesCombo = territories
        );
    }

    getCurrentUser(fromIdp: boolean) {
        if (fromIdp) {
            this.userService.getCurrentUser(true)
                .subscribe(res => {
                        this.userDataFromIdp = res.output;

                });
        } else {
            this.userService.getCurrentUser(false)
                .subscribe(res => {
                        this.userData = res.output;
                });
        }
    }

}
