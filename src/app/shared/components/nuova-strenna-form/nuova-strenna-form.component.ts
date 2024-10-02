import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipient, RecipientDTO } from '../../model/recipient.model'
import { StrenneService } from '../../service/strenne.service'
import { StrenneInputTextComponent } from './strenne-input-text/strenne-input-text.component';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ExtendedStrennaDTO } from '../../model/extended-strenna.model';
import { StrennaDatePickerComponent } from './strenna-date-picker/strenna-date-picker.component';
import { StrennaDTO } from '../../model/strenna.model';
import { DialogService } from '../../service/dialog.service';
import { FormService } from './form-service.service';


@Component({
  selector: 'app-nuova-strenna-form',
  templateUrl: './nuova-strenna-form.component.html',
  styleUrls: ['./nuova-strenna-form.component.css']
})
export class NuovaStrennaFormComponent implements OnInit {

  @ViewChild('isDirector') selectIsDirector: MatSelect;
  @ViewChild('receptionistEmail') receptionistEmailComponent: StrenneInputTextComponent;
  @ViewChild('sender') senderComponent: StrenneInputTextComponent;
  @ViewChild('senderCity') senderCityComponent: StrenneInputTextComponent;
  @ViewChild('courier') courierComponent: StrenneInputTextComponent;
  @ViewChild('watbill') watbillComponent: StrenneInputTextComponent;
  @ViewChild('warehouseLocation') warehouseLocationComponent: StrenneInputTextComponent;
  @ViewChild('note') noteComponent: StrenneInputTextComponent;
  @ViewChild('date') dateComponent: StrennaDatePickerComponent;
  @ViewChild('submitCustomButton') submitButton: ElementRef;

  myForm: UntypedFormGroup;
  extendedStrenna: ExtendedStrennaDTO;
  selectedRecipient: Recipient;

  isDirectorSelectedOptionValue: string;
  selectedDeliveryOption: string;
  selectedGiftOption: string;
  isBulky: string;
  isPerisheable: string;

  selectedDateOption: string;
  elementId: string;

  recipientID: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  receptionistMail: string;
  @Input() selectDeliveryOption: string;
  @Output() savedStrenna = new EventEmitter<any>();

  myUser: RecipientDTO;

  formControl = new UntypedFormControl();

  isDirectorDisabled: boolean = false;
  flag: boolean = true;

  constructor(public translate: TranslateService, private dialog: MatDialog,
    private strenneService: StrenneService, private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder, private formService: FormService) {


    this.myForm = formService.getForm();

    this.myForm = this.formBuilder.group({
      isDeperisheableOption: ['', Validators.required],
      isBulkyOption: ['', Validators.required],
      strennaTypeOption: ['', Validators.required],
      deliveryMethodOption: ['', Validators.required],
      isDirectorSelectedOption: ['', Validators.required] , 
    });

  }

  deliveryOptions: any[] = [
    { value: 'courier', viewValue: 'strennaForm.courier' },
    { value: 'manualDelivery', viewValue: 'strennaForm.manualDelivery' },
    { value: 'postalPackage', viewValue: 'strennaForm.postalPackage' },
    { value: 'recommended', viewValue: 'strennaForm.recommended' },
    { value: 'expressPost', viewValue: 'strennaForm.expressPost' },
    { value: 'priorityPost', viewValue: 'strennaForm.priorityPost' },
    { value: 'standardPost', viewValue: 'strennaForm.standardPost' }
  ];

  giftOptions: any[] = [
    { value: 'giftOptionBottle', viewValue: 'strennaForm.giftOptionBottle' },
    { value: 'giftOptionPanettone', viewValue: 'strennaForm.giftOptionPanettone' },
    { value: 'giftOptionCalendar', viewValue: 'strennaForm.giftOptionCalendar' },
    { value: 'giftOptionFood', viewValue: 'strennaForm.giftOptionFood' },
    { value: 'giftOptionToCheck', viewValue: 'strennaForm.giftOptionToCheck' },
    { value: 'giftOptionOther', viewValue: 'strennaForm.giftOptionOther' }
  ];



  ngOnInit(): void { 
  }

  saveStrenna() {
    let extendedStrenna = this.extendedStrennaMap();

    (this.strenneService.addStrenna(extendedStrenna))
      .pipe()
      .subscribe(r => {
        if (r === 1) {
          this.dialogService.openSuccessDialog('strennaForm.saveSuccessful');
          this.savedStrenna.emit(true);
        }
      });
    this.dialog.closeAll();
    this.myForm.reset();
  }

  handleSelectedProfile(event) {
    if (event) {
      const user = event;
      this.recipientID = user.user_id;
      this.recipientEmail = user.user_email;
      this.recipientFirstName = user.user_first_name;
      this.recipientLastName = user.user_last_name;
      if (this.recipientID.toUpperCase() === 'DEFAULT') {
        this.isDirectorDisabled = true;
        this.setIsDirectorNo();
        this.areAllControlsValid() ; 
        this.updateReceptionValidator();
        this.noteComponent.setRequired(true) ; 
      } else {
        this.getReceptionistMail(user.user_id);
        this.noteComponent.setRequired(false) ; 
      }
    } else {
      this.recipientID = null;
      this.recipientEmail = null;
      this.recipientFirstName = null;
      this.recipientLastName = null;
      this.receptionistMail = null;
      this.areAllControlsValid();
    }
  }

  getReceptionistMail(userId: string) {

    this.strenneService.getReceptionistMail({ userId })
      .pipe().subscribe
      (response => {
        const output = response.output
        if (output && output.is_director_or_board) {
          const mail = output.receptionist_email;
          this.receptionistEmailComponent.updateText(mail);
          this.receptionistMail = mail;
          this.setIsDirectorYes();
          this.isDirectorDisabled = true;
        }
        else {
          this.receptionistEmailComponent.cleanText();
          this.cleanIsDirectorSelect();
          this.isDirectorDisabled = false;
        }
        this.updateReceptionValidator();
        this.areAllControlsValid();
      });

  }


  setIsDirectorNo() {
    const formValues = this.myForm.value;
    this.isDirectorSelectedOptionValue = 'false';
    this.myForm.value['isDirectorSelectedOption'] = false;
  }

  setIsDirectorYes() {
    const formValues = this.myForm.value;

    this.isDirectorSelectedOptionValue = 'true';
    this.myForm.value['isDirectorSelectedOption'] = true;
  }

  cleanIsDirectorSelect() {
    this.isDirectorSelectedOptionValue = null;
  }

  setIsDeperisheableYes() {
    this.isPerisheable = 'true';
  }

  cleanIsDeperisheableSelect() {
    this.isPerisheable = null;
  }

  updateReceptionValidator() {
    this.receptionistEmailComponent.setRequired(this.isDirectorSelectedOptionValue === 'true');
    
    this.flag = (this.isDirectorSelectedOptionValue === 'false') ; 
  }

  extendedStrennaMap(): ExtendedStrennaDTO {

    const newRecipientDto = {
      user_id: this.recipientID,
      email: this.recipientEmail,
      user_name: this.recipientFirstName,
      receptionist_email: this.receptionistEmailComponent.getText(),
      is_director_or_board: this.isDirectorSelectedOptionValue,
      user_surname: this.recipientLastName

    } as RecipientDTO;


    const newStrennaDto = {
      sender: this.senderComponent.getText(),
      receiver: this.recipientID,
      sender_city: this.senderCityComponent.getText(),
      method: this.selectedDeliveryOption,
      courier: this.courierComponent.getText(),
      lettura_vettura: this.watbillComponent.getText(),
      type: this.selectedGiftOption,
      date: this.dateComponent.getText(),
      stock_position: this.warehouseLocationComponent.getText(),
      note: this.noteComponent.getText(),
      bulky: this.isBulky,
      perisheable: this.isPerisheable

    } as StrennaDTO;


    let currentExtendedStrenna = {
      recipient: newRecipientDto,
      strenna: newStrennaDto
    } as ExtendedStrennaDTO;

    return currentExtendedStrenna;
  }

  isValueDefined(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  areAllControlsValid() {

    if (!this.recipientID || this.recipientID === '')
      return false;

    for (const controlName of Object.keys(this.formService.myForm.controls)) {
      if (this.formService.getControl(controlName).invalid) {
        return false;
      }
    }
    const formValues = this.myForm.value;
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key) && (formValues[key] === null || formValues[key] === '' || formValues[key] === undefined)) {
        return false;
      }
    }
    return true;
  }


}
