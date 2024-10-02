import {Component, Input, OnInit} from '@angular/core';

import {ProfileService} from '../../shared/service/profile.service';
import {TerritoryService} from '../../shared/service/territory.service';
import {UsersService} from '../../shared/service/users.service';
import {UserData} from '../../shared/model/message';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UserComponent implements OnInit {

    @Input() territories: {id: string; value: string}[];

    @Input() profiles: {id: string; value: string}[];

    filterByTerritory: string;

    isTrue: boolean = true;

    orderByKey: string = '';

    orderDirection: string = '';

    filterByProfile: string;

    data: UserData[] = [];

    constructor(private territoryService: TerritoryService,
                private profileService: ProfileService,
                private usersService: UsersService) {
    }
    ngOnInit(): void {
        this.profileService.getUserProfiles().subscribe(profiles => this.profiles = profiles);
    }

    users() {
        this.data = [];
        if (this.filterByProfile != null) {
            this.usersService.getUsers(this.filterByProfile, this.filterByTerritory).subscribe(users => {
                this.data = users.output;
            });
        }
        else {
            throw new TypeError('Profile is required');
        }
    }

    updateSorting(event: any) {
        this.orderByKey = event.detail.key;
        this.orderDirection = event.detail.direction;
        console.log(this.orderByKey);
    }

    clear() {
        this.data = [];
    }

    selectProfile(event: any) {
        this.filterByProfile = event.detail;
    }

    selectTerritory(event: any) {
        this.filterByTerritory = event.detail;
    }
}
