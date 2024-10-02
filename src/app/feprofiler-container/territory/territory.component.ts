import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../shared/service/profile.service';
import {TerritoryService} from '../../shared/service/territory.service';
import {TerritoryCodeOutput} from '../../shared/model/message';

@Component({
    selector: 'app-territory',
    templateUrl: './territory.component.html'
})
export class TerritoryComponent implements OnInit {

    data = [];

    profiles: {id: string; value: string}[];

    filterBy: string;
    isLoaded = false;
    isLoadedP = false;

    constructor(private profileService: ProfileService,
                private territoryService: TerritoryService) {
    }

    ngOnInit(): void {
        this.profileService.getUserProfiles().subscribe(profiles => {
            this.profiles = profiles;
        });
    }

    selectElement(event) {
        this.filterBy = event.detail;
    }

    territories() {
        this.data = [];
        this.territoryService.getTerritories(this.filterBy).subscribe(territories => {
            this.data = [];
            territories.output.forEach(ter => {
                const tmp = {} as TerritoryCodeOutput;
                tmp.code = ter.code;
                tmp.codeParent = ter.codeParent;
                tmp.description = ter.description;
                tmp.level = ter.level;
                tmp.activities = (ter.activities.map(act => act.code).join(', '));
                this.data.push(tmp);
            });
            });
    }


    clear() {
        this.data = [];
    }


}
