import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormService } from '../form-service.service';
import { UntypedFormControl } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';

@Component({
  selector: 'app-strenna-date-picker',
  templateUrl: './strenna-date-picker.component.html',
  styleUrls: ['./strenna-date-picker.component.css']
})
export class StrennaDatePickerComponent implements OnInit {

  @ViewChild('releasedAtPicker') datePicker: MatDatepickerInput<any>;


  @Input() elementId: string;
  @Input() flag: boolean = false;
  @Input() controlName: string;
  @Input() minDate: Date;
  @Input() enableWeekend: boolean = false;
  @Output() inputChange = new EventEmitter<any>();
  formControl = new UntypedFormControl();


  constructor(private datePipe: DatePipe,
    public formServiceDate: FormService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.controlName)
      this.formServiceDate.addControl(this.controlName);
  }

  selectedDateOption: string;

  getText(): string {
    return this.datePipe.transform(this.selectedDateOption, 'yyyy-MM-dd');
  }

  cleanText(): void {
    if (this.controlName)
      this.formServiceDate.getControl(this.controlName).setValue(null);
    else
      this.formControl.setValue(null);
  }

  setDateFromString(dateString: string) {
    const dateParts = dateString.split('-').map(Number);

    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      const selectedDate = new Date(year, month - 1, day);

      this.datePicker.value = selectedDate;
      if (this.controlName) {
        this.formServiceDate.getControl(this.controlName).setValue(selectedDate);
      } else {
        this.formControl.setValue(selectedDate);
      }

      this.cdr.detectChanges();
    }
  }

  handleInputChange() {
    this.inputChange.emit();
  }

  weekendsDatesFilter = (d: any): boolean => {
    d = d.toDate();
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }


}


