import {Component, OnInit, ViewChild} from '@angular/core';
import {SpinnerService} from '../../service/spinner.service';
import {FocusMonitor} from "@angular/cdk/a11y";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit{

  isLoading = false;
  @ViewChild('spinner') spinner;
  constructor(private spinnerService: SpinnerService, private focusMonitor: FocusMonitor) {}

  ngOnInit() {
    this.spinnerService.isLoading.subscribe((isLoading) => {
      setTimeout(() => {
        this.isLoading = isLoading;
        if (this.isLoading && this.spinner) {
          this.focusMonitor.focusVia(this.spinner, null);
        }
      });
    });
  }

}
