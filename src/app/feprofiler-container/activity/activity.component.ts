import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../../shared/service/profile.service';
import {TerritoryService} from '../../shared/service/territory.service';
import {ActivityService} from '../../shared/service/activity.service';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit {

    @Input() territories: {id: string; value: string}[];

    @Input() profiles: {id: string; value: string}[];

    filterByTerritory: string;

    filterByProfile: string;

    data = [];
    isLoaded = false;

    constructor(private territoryService: TerritoryService,
                private profileService: ProfileService,
                private activityService: ActivityService) {
    }

    ngOnInit(): void {
        this.profileService.getUserProfiles().subscribe(profiles => this.profiles = profiles);
    }

    activities() {
        this.data = [];
        this.activityService.getActivities(this.filterByTerritory, this.filterByProfile).subscribe(activities => {
            this.data = activities.output;
        });
    }

    clear() {
        this.data = [];
    }

    selectTerritory(event: any) {
        this.filterByTerritory = event.detail;
    }

    selectProfile(event: any) {
        this.filterByProfile = event.detail;
    }
}
