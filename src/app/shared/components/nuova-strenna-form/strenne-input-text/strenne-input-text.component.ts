import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormService } from '../form-service.service';

@Component({
  selector: 'app-strenne-input-text',
  templateUrl: './strenne-input-text.component.html',
  styleUrls: ['./strenne-input-text.component.css']
})
export class StrenneInputTextComponent implements OnInit, OnDestroy {

  @Input() textLabel: string;
  @Input() input: string;
  @Input() elementId: string;
  @Input() controlName: string;
  @Input() isDisabled: boolean = false;


  formControl = new UntypedFormControl();
  isRequiredSpan: boolean = false;


  constructor(public formService: FormService, private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {

    if (this.controlName)
      this.formService.addControl(this.controlName);
    this.formControl.setValue(this.input);

  }

  ngOnDestroy(): void {
    this.cleanText();
  }

  updateText(text: string) {
    if (this.controlName)
      this.formService.getControl(this.controlName).setValue(text);
    else {
      this.formControl.setValue(text);
    }
    this.cdr.detectChanges();
  }

  cleanText() {
    if (this.controlName)
      this.formService.getControl(this.controlName).setValue(null);
    else
      this.formControl.setValue(null);

    this.cdr.detectChanges();
  }

  getText() {
    if (this.controlName)
      return this.formService.getControl(this.controlName).value;
    else
      return this.formControl.value;
  }

  setRequired(required: boolean): void {
    this.formService.setControlRequiredStatus(this.controlName, required);
    this.isRequiredSpan = required;
  }



}
