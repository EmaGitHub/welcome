import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TerritoryService} from '../../shared/service/territory.service';
import {ActivityService} from '../../shared/service/activity.service';
import {AbilitationService} from '../../shared/service/abilitation.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

    resultType1: boolean;
    resultType2: boolean;
    resultType3: boolean;
    private territoriesCombo: any;
    constructor(private territoryService: TerritoryService,
                private activityService: ActivityService,
                private abilitationService: AbilitationService) {
    }

    @Output() updateUser = new EventEmitter<string>();

    label1 = 'Show menu';
    label2 = 'Add order';
    label3 = 'Delete order';

    ngOnInit() {
        this.territoryService.getTerritoriesCombo().subscribe(territories => {
                this.territoriesCombo = territories;
                this.abilitationService.isUserEnabled('MENU_ACTIVITY', this.territoriesCombo[0].id).subscribe
                (res => this.resultType1 = res.output);
                this.abilitationService.isUserEnabled('ADD_ORDER_ACTIVITY', this.territoriesCombo[0].id).subscribe
                (res => this.resultType2 = res.output);
                this.abilitationService.isUserEnabled('REMOVE_ORDER_ACTIVITY', this.territoriesCombo[0].id).subscribe
                (res => this.resultType3 = res.output);
        });

    }
}
