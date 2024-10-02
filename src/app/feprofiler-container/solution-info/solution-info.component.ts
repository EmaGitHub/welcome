import {Component, OnInit} from '@angular/core';
import { SolutionService } from '../../shared/service/solution.service';

@Component({
    selector: 'app-solutioninfo',
    templateUrl: './solution-info.component.html'
})
export class SolutionInfoComponent implements OnInit {

  solutionVersion: string;


    constructor(private solutionService: SolutionService) {
      this.solutionVersion = 'Undefined';
    }

    ngOnInit(): void {
      this.solutionService.getCurrentVersion().pipe().subscribe(res => {
          if (res) {
              this.solutionVersion = res;
          }
      });
  }



}
