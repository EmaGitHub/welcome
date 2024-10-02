import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StrenneManagementService } from 'src/app/pages/strenne-management/strenne-management.service';
import { formatDate } from '@angular/common';
import { Recipient, RecipientDTO } from 'src/app/shared/model/recipient.model';
import { Strenna, StrennaDTO } from 'src/app/shared/model/strenna.model';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from 'src/app/shared/components/nuova-strenna-form/form-service.service';
import { StrennaDatePickerComponent } from 'src/app/shared/components/nuova-strenna-form/strenna-date-picker/strenna-date-picker.component';
import { StrenneInputTextComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-input-text/strenne-input-text.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { StrenneSearchProfileComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-search-profile/strenne-search-profile.component';
import { Profile } from 'src/app/shared/model/profile.model';
import { ExtendedStrennaDTO } from 'src/app/shared/model/extended-strenna.model';
import { StrennaResponseDTO } from 'src/app/shared/model/strennaResponse.model';
import { ExtendedStrennaResponseDTO } from 'src/app/shared/model/extended-strenna-response.model';
import { RestResponse } from 'src/app/shared/model/message';
import { SlotOfWeekDto } from 'src/app/shared/model/slotOfWeekDto.model';


@Component({
  selector: 'app-edit-stenna',
  templateUrl: './edit-stenna.component.html',
  styleUrls: ['./edit-stenna.component.css']
})
export class EditStennaComponent implements OnInit, AfterViewInit {

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
  @ViewChild('recipient') recipientComponent: StrenneSearchProfileComponent;
  @ViewChild('delegate') delegateComponent: StrenneSearchProfileComponent;
  @ViewChild('withdrawalUser') withdrawaluserComponent: StrenneSearchProfileComponent;
  @ViewChild('withdrawalDate') withdrawDateComponent: StrennaDatePickerComponent;
  @ViewChild('actualWithdrawalDate') actualWithdrawalDateComponent: StrennaDatePickerComponent;



  myForm: UntypedFormGroup;
  extendedStrennaResponse: ExtendedStrennaDTO;
  selectedRecipient: Recipient;

  isDirectorSelectedOptionValue: string;
  selectedDeliveryOption: string;
  selectedGiftOption: string;
  selectedHandleOption: string;
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
  flag: boolean = true;
  
  myUser: RecipientDTO;

  formControl = new UntypedFormControl();


  id_strenna: any;

  list: Strenna[];
  result: Strenna;

  infoList: ExtendedStrennaDTO[] = [];
  info: ExtendedStrennaDTO;

  myRecipient: RecipientDTO;
  myStrenna: StrennaDTO;
  recipient: any;
  strenna: any;
  response: any;
  delegateEmail: string;
  delegateID: string;
  delegateFirstName: string;
  delegateLastName: string;
  withdrawalHour: number;
  selectedHourOption: string;
  responseRequired: boolean = false;
  now: Date = new Date();
  userWithdrawalId: any;
  userWithdrawalIdName: any;
  userWithdrawalIdLastName: any;
  isDirectorDisabled: boolean;

  slotOfWeek: any;

  constructor(private route: ActivatedRoute,
    private strenneManagementService: StrenneManagementService, public translate: TranslateService, private dialog: MatDialog,
    private strenneService: StrenneService, private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder, private formService: FormService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    //this.id_strenna = this.route.snapshot.paramMap.get('id_strenna');
    this.myForm = formService.getForm();

    this.myForm = this.formBuilder.group({
      isDeperisheableOption: ['', Validators.required],
      isBulkyOption: ['', Validators.required],
      strennaTypeOption: ['', Validators.required],
      deliveryMethodOption: ['', Validators.required],
      isDirectorSelectedOption: ['', Validators.required]
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

  handleOptions: any[] = [
    { value: 'refused', viewValue: 'strennaForm.refused' },
    { value: 'donated', viewValue: 'strennaForm.donated' },
    { value: 'accepted', viewValue: 'strennaForm.accepted' }
  ];

  hourOptions: any[] = [];


  ngOnInit() {
    const passedStrenna = history.state['data'];
    if (!passedStrenna)
      this.router.navigate(["/strenne-management"]);
    this.recipient = passedStrenna.recipient;
    this.strenna = passedStrenna.strenna;
    this.response = passedStrenna.strennaResponse;
  }

  ngAfterViewInit(): void {
    this.initializeValues();
  }

  initializeValues() {

    //UPDATE RECIPIENT
    const profile = {
      first_name: this.recipient.user_name,
      last_name: this.recipient.user_surname,
      email: this.recipient.email,
      user_name: this.recipient.user_id
    } as Profile;
    this.recipientComponent.initValue(profile);
    this.isDirectorDisabled = false;
    if (this.recipient.is_director_or_board) {
      const mail = this.recipient.receptionist_email;
      this.receptionistEmailComponent.updateText(mail);
      this.receptionistMail = mail;
      this.isDirectorDisabled = true;
    }
    if (this.recipient.user_id.toUpperCase() === 'DEFAULT') {
      this.isDirectorDisabled = true;
      this.setIsDirectorNo();
      this.areAllControlsValid();
      this.updateReceptionValidator();
      this.noteComponent.setRequired(true);
    } else {
      this.noteComponent.setRequired(false);
    }

    this.isDirectorSelectedOptionValue = this.recipient.is_director_or_board ? 'true' : 'false';
    this.cdr.detectChanges();

    this.updateReceptionValidator();

    this.recipientID = this.recipient.user_id;
    this.recipientEmail = this.recipient.email;
    this.recipientFirstName = this.recipient.user_name;
    this.recipientLastName = this.recipient.user_surname;

    //UPDATE DELEGATE
    if (this.response.delegate) {
      const delegateProfile = {
        first_name: this.response.delegate_name,
        last_name: this.response.delegate_surname,
        email: this.response.delegate_mail,
        user_name: this.response.delegate
      } as Profile;
      this.delegateComponent.initValue(delegateProfile);
      this.delegateID = this.response.delegate;
      this.delegateEmail = this.response.delegate_mail;
      this.delegateFirstName = this.response.delegate_name;
      this.delegateLastName = this.response.delegate_surname;
    }

    //UPDATE WITHDRAWAL USER
    if (this.response.user_id_withdrawal_strenna) {
      const userWithdrawalProfile = {
        first_name: this.response.user_name_withdrawal_strenna,
        last_name: this.response.user_surname_withdrawal_strenna,
        email: undefined,
        user_name: this.response.user_id_withdrawal_strenna
      } as Profile;

      if (this.withdrawaluserComponent)
        this.withdrawaluserComponent.initValue(userWithdrawalProfile);

      this.userWithdrawalId = this.response.user_id_withdrawal_strenna;
      this.userWithdrawalIdName = this.response.user_name_withdrawal_strenna;
      this.userWithdrawalIdLastName = this.response.user_surname_withdrawal_strenna;
    }

    if (this.strenna.note) {
      this.noteComponent.updateText(this.strenna.note);
    }

    if (this.strenna.sender) {
      this.senderComponent.updateText(this.strenna.sender);
    }

    if (this.strenna.sender_city) {
      this.senderCityComponent.updateText(this.strenna.sender_city);
    }

    if (this.strenna.method) {
      this.selectedDeliveryOption = this.strenna.method;
      this.cdr.detectChanges();
    }

    if (this.strenna.courier) {
      this.courierComponent.updateText(this.strenna.courier);
    }

    if (this.strenna.lettura_vettura) {
      this.watbillComponent.updateText(this.strenna.lettura_vettura)
    }

    if (this.strenna.type) {
      this.selectedGiftOption = this.strenna.type;
      this.cdr.detectChanges();
    }

    if (this.strenna.bulky !== null && this.strenna.bulky !== undefined) {
      this.isBulky = this.strenna.bulky ? "true" : "false";
      this.cdr.detectChanges();
    }

    if (this.strenna.perisheable !== null && this.strenna.perisheable !== undefined) {
      this.isPerisheable = this.strenna.perisheable ? "true" : "false";
      this.cdr.detectChanges();
    }

    if (this.strenna.date) {
      this.dateComponent.setDateFromString(this.strenna.date);
    }

    if (this.strenna.stock_position) {
      this.warehouseLocationComponent.updateText(this.strenna.stock_position);
    }

    if (this.response.withdrawal_date) {
      this.withdrawDateComponent.setDateFromString(this.response.withdrawal_date);
    }

    if (this.response.handling) {
      this.selectedHandleOption = this.response.handling;
      this.cdr.detectChanges();
    }

    if (this.response.actual_withdrawal_date) {
      this.actualWithdrawalDateComponent.setDateFromString(this.response.actual_withdrawal_date);
    }

    if (this.response.withdrawal_hour) {
      this.selectedHourOption = this.response.withdrawal_hour;
      this.cdr.detectChanges();
    }

    this.handleResponseSectionChange();
    this.areAllControlsValid();

  }

  updateStrenna() {
    let extendedResponseStrenna = this.extendedStrennaResponseMap();
    (this.strenneService.updateStrenna(extendedResponseStrenna))
      .pipe()
      .subscribe(r => {
        if (r > 0) {
          this.dialogService.openSuccessDialog('strennaForm.updateSuccessful');
          this.myForm.reset();
          this.router.navigate(['strenne-management']);
        }
      });
    this.dialog.closeAll();
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
        this.areAllControlsValid();
        this.updateReceptionValidator();
        this.noteComponent.setRequired(true);
      } else {
        this.getReceptionistMail(user.user_id);
        this.noteComponent.setRequired(false);
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

  handleSelectedProfileDelegate(event) {
    if (event) {
      const user = event;
      this.delegateID = user.user_id;
      this.delegateEmail = user.user_email;
      this.delegateFirstName = user.user_first_name;
      this.delegateLastName = user.user_last_name;
    } else {
      this.delegateID = null;
      this.delegateEmail = null;
      this.delegateFirstName = null;
      this.delegateLastName = null;
    }
    this.handleResponseSectionChange();
  }

  handleSelectedWithdrawalUser(event) {
    if (event) {
      const user = event;
      this.userWithdrawalId = user.user_id;
      this.userWithdrawalIdName = user.user_first_name;
      this.userWithdrawalIdLastName = user.user_last_name;
    } else {
      this.userWithdrawalId = null;
      this.userWithdrawalIdName = null;
      this.userWithdrawalIdLastName = null;
    }
  }

  handleResponseSectionChange() {
    if (this.delegateID || this.selectedHourOption || this.withdrawDateComponent.getText() || this.selectedHandleOption === "accepted") {
      this.responseRequired = true;
    } else {
      this.responseRequired = false;
    }
    this.areAllControlsValid();
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

  setIsDirectorYes() {
    const formValues = this.myForm.value;

    this.isDirectorSelectedOptionValue = 'true';
    this.myForm.value['isDirectorSelectedOption'] = true;
  }

  setIsDirectorNo() {
    const formValues = this.myForm.value;
    this.isDirectorSelectedOptionValue = 'false';
    this.myForm.value['isDirectorSelectedOption'] = false;
  }

  cleanIsDirectorSelect() {
    this.isDirectorSelectedOptionValue = null;
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
  }

  extendedStrennaResponseMap(): ExtendedStrennaResponseDTO {

    const newRecipientDto = {
      user_id: this.recipientID,
      email: this.recipientEmail,
      user_name: this.recipientFirstName,
      receptionist_email: this.receptionistEmailComponent.getText(),
      is_director_or_board: this.isDirectorSelectedOptionValue,
      user_surname: this.recipientLastName

    } as RecipientDTO;


    const newStrennaDto = {
      id_strenna: this.strenna.id_strenna,
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

    const newStrennaResponseDto = {
      id_response: this.response.id_response,
      id_strenna: this.response.id_strenna,
      handling: this.selectedHandleOption,
      delegate: this.delegateID,
      delegate_name: this.delegateFirstName,
      delegate_surname: this.delegateLastName,
      delegate_mail: this.delegateEmail,
      withdrawal_date: this.withdrawDateComponent.getText(),
      withdrawal_hour: this.selectedHourOption,
      actual_withdrawal_date: this.actualWithdrawalDateComponent ? this.actualWithdrawalDateComponent.getText() : null,
      user_id_withdrawal_strenna: this.userWithdrawalId,
      user_name_withdrawal_strenna: this.userWithdrawalIdName,
      user_surname_withdrawal_strenna: this.userWithdrawalIdLastName
    } as StrennaResponseDTO;


    let currentExtendedStrenna = {
      recipient: newRecipientDto,
      strenna: newStrennaDto,
      strennaResponse: newStrennaResponseDto
    } as ExtendedStrennaResponseDTO;

    return currentExtendedStrenna;
  }

  isValueDefined(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  areAllControlsValid() {
    if (!this.recipientID || this.recipientID === '') {
      return false;
    }

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

    if (this.responseRequired) {
      if (!(this.selectedHourOption && this.withdrawDateComponent.getText() && this.selectedHandleOption)) {
        return false;
      }
    }

    return true;
  }

  closeAction() {
    this.router.navigate(['strenne-management']);
  }

  formatData(data: string): string {
    const formattedDate = formatDate(data, 'dd/MM/yy', 'en-US');
    return formattedDate;
  }

  manageStatus(status: string): string {
    switch (status) {
      case 'toBeWithdrawn':
        return 'Da Ritirare';
      case 'toBeManaged':
        return 'Da gestire';
      case 'delivered':
        return 'Consegnata';
      case 'refused':
        return 'Rifiutata';
      case 'donated':
        return 'Donata';
      case 'cancelled':
        return 'Cancellata';
      default:
        return 'Stato non riconosciuto';
    }
  }

  isWithDrawalEnabled(): boolean {
    return this.selectedHandleOption === 'accepted';
  }


  isWithdrawalUserEnabled() {
    if (this.actualWithdrawalDateComponent && this.actualWithdrawalDateComponent.getText())
      return true;
    return false;
  }

  withdrawalDateChange(){
    if(this.withdrawDateComponent && this.withdrawDateComponent.getText()){
      if(!this.slotOfWeek){
        this.strenneService.getSlotOfWeek().pipe().subscribe(
          (response: RestResponse<SlotOfWeekDto>) =>{
            if(response.output){
              this.slotOfWeek = this.getMapFromSlotOfWeek(response.output);
              var clearHourOption: boolean = true;
              const slots = this.slotOfWeek.get(
              this.getDayOfWeekLowerCase(this.withdrawDateComponent.getText()));
              this.hourOptions = [];
              slots.forEach(element => {
                if(element && this.selectedHourOption && this.selectedHourOption === element){
                  clearHourOption = false;
                }
                this.hourOptions.push({
                  value: element,
                  viewValue: element
                });
              });
              if(clearHourOption){
                this.selectedHourOption = null;
              }
            }
          }
        );
      }else{
        var clearHourOption: boolean = true;
        const slots = this.slotOfWeek.get(
        this.getDayOfWeekLowerCase(this.withdrawDateComponent.getText()));
        this.hourOptions = [];
        slots.forEach(element => {
          if(element && this.selectedHourOption && this.selectedHourOption === element){
            clearHourOption = false;
          }
          this.hourOptions.push({
            value: element,
            viewValue: element
          }); 
        });
        if(clearHourOption){
          this.selectedHourOption = null;
        }
      }
    }else{
      this.selectedHourOption = null;
    }
  }
  
  private getMapFromSlotOfWeek(slotOfWeek: SlotOfWeekDto){        
    var map = new Map();
    map.set("monday", slotOfWeek.Monday);
    map.set("tuesday", slotOfWeek.Tuesday);
    map.set("wednesday", slotOfWeek.Wednesday);
    map.set("thursday", slotOfWeek.Thursday);
    map.set("friday", slotOfWeek.Friday);
    return map;
  }

  private getDayOfWeekLowerCase(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayOfWeekNumeric = date.getDay();
    const dayOfWeekLowerCase = daysOfWeek[dayOfWeekNumeric];
  
    return dayOfWeekLowerCase;
  }

}


