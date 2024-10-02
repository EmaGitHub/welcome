import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Site} from '../../model/site.model';

@Component({
  selector: 'app-text-filter-select',
  templateUrl: './text-filter-select.component.html',
  styleUrls: ['./text-filter-select.component.css']
})
export class TextFilterSelectComponent implements OnInit {

  filterControl = new UntypedFormControl();
  formCtrlSub: Subscription;
  @Output() filter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.formCtrlSub = this.filterControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(newValue => {
          this.filter.emit(newValue);
          });
  }

}
