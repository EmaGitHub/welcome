import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  myForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.myForm = this.formBuilder.group({});
  }

  addControl(controlName: string) {
    if(controlName === 'dateControlFilter'){
      this.myForm.addControl(controlName,
        this.formBuilder.control(''));
    }else {
      this.myForm.addControl(controlName,
        this.formBuilder.control('', Validators.required
        ));
    }
  }
  getControl(controlName: string) {
    return this.myForm.get(controlName);
  }

  getForm(): UntypedFormGroup {
    return this.myForm;
  }

  setControlRequiredStatus(controlName: string, required: boolean) {
    const control = this.getControl(controlName);

    if (required) {
      control.setValidators([Validators.required]);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
  }

}