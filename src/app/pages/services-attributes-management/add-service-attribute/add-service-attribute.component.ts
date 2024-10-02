import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AddServiceAttributeType } from './service-attribute-type.model';

@Component({
  selector: 'app-add-service-attribute',
  templateUrl: './add-service-attribute.component.html',
  styleUrls: ['./add-service-attribute.component.scss']
})
export class AddServiceAttributeComponent implements OnInit {

  @Input() type: AddServiceAttributeType;
  @Output() buttonClicked = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();

  firstNameControl = new UntypedFormControl();
  formCtrlSub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.formCtrlSub = this.firstNameControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(newValue => {
          this.filter.emit(newValue);
        });
  }

  handleServiceAttribute(): void {
    this.buttonClicked.emit();
  }
}
