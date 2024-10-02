import {Component, Input} from '@angular/core';
import {ProfileService} from '../../shared/service/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    isLoaded = false;
    data = [];
    @Input() territories: [];

    filterBy: string;

    constructor(private profileService: ProfileService) {
    }

    profiles() {
        this.data = [];
        this.isLoaded = false;
        this.profileService.getProfiles(this.filterBy).subscribe(profiles => {
            this.data = profiles.output;
            this.isLoaded = true;
        });
    }

    clear() {
        this.data = [];
    }

    selectTerritory(event: any) {
        this.filterBy = event.detail;
    }
}
