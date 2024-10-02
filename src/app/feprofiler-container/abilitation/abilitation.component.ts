import {Component, Input, OnInit} from '@angular/core';
import {TerritoryService} from '../../shared/service/territory.service';
import {ActivityService} from '../../shared/service/activity.service';
import {AbilitationService} from '../../shared/service/abilitation.service';

@Component({
  selector: 'app-abilitation',
  templateUrl: './abilitation.component.html'
})
export class AbilitationComponent implements OnInit {

  constructor(private territoryService: TerritoryService,
              private activityService: ActivityService,
              private abilitationService: AbilitationService) { }

  result = Abilitation.empty;

  resultType = ResultType.empty;


  @Input() territories: {id: string; value: string}[];

  activities: {id: string; value: string}[];

  choosenActivity: string;

  choosenTerritory: string;


  clear() {
    this.result = Abilitation.empty;
    this.resultType = ResultType.empty;
  }

  isUserEnabled() {
    this.abilitationService.isUserEnabled(this.choosenActivity, this.choosenTerritory).subscribe(enabled => {
      if (enabled.output === true){
        this.result = Abilitation.enabled;
        this.resultType = ResultType.success;
      }
      else{
        this.result = Abilitation.notEnabled;
        this.resultType = ResultType.danger;
      }
    } );
  }

  ngOnInit(): void {
    this.activityService.getActivityCombo().subscribe( activities =>
        this.activities = activities);
  }

    selectActivity(event: any) {
      this.choosenActivity = event.detail;
    }

  selectTerritory(event: any) {
    this.choosenTerritory = event.detail;
  }
}

export enum ResultType {
  success = 'green',
  danger = 'magenta',
  empty = ''
}
export enum Abilitation {
  enabled = 'Enabled',
  notEnabled = 'Not Enabled',
  empty = ''
}
