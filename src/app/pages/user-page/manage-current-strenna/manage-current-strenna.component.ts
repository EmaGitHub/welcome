import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from 'src/app/shared/components/nuova-strenna-form/form-service.service';
import { StrennaDatePickerComponent } from 'src/app/shared/components/nuova-strenna-form/strenna-date-picker/strenna-date-picker.component';
import { StrenneInputTextComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-input-text/strenne-input-text.component';
import { ExtendedStrennaDTO } from 'src/app/shared/model/extended-strenna.model';
import { RestResponse } from 'src/app/shared/model/message';
import { Profile } from 'src/app/shared/model/profile.model';
import { RecipientDTO } from 'src/app/shared/model/recipient.model';
import { SlotOfWeekDto } from 'src/app/shared/model/slotOfWeekDto.model';
import { StrennaDTO } from 'src/app/shared/model/strenna.model';
import { StrennaResponseDTO } from 'src/app/shared/model/strennaResponse.model';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { StrennaInfo } from '../../strenne-management/strenna-list-item.model';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import { Utility } from 'src/app/shared/utils/utility';

@Component({
  selector: 'app-manage-current-strenna',
  templateUrl: './manage-current-strenna.component.html',
  styleUrls: ['./manage-current-strenna.component.css']
})
export class ManageCurrentStrennaComponent implements OnInit {

  isDesktopView = true;
  collectionSize: any = 0;
  dataSource = new MatTableDataSource<StrennaInfo>();
  tableItems: any[] = [];

  lastStrennaFilter: any;
  selectedDateOption: string;
  selectedDeliveryOption: string;
  selectedGiftOption: string;
  selectedHandleOption: string;
  selectedHourOption: string;

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



  @ViewChild('receptionistEmail') receptionistEmailComponent: StrenneInputTextComponent;
  @ViewChild('sender') senderComponent: StrenneInputTextComponent;
  @ViewChild('senderCity') senderCityComponent: StrenneInputTextComponent;
  @ViewChild('courier') courierComponent: StrenneInputTextComponent;
  @ViewChild('watbill') watbillComponent: StrenneInputTextComponent;
  @ViewChild('warehouseLocation') warehouseLocationComponent: StrenneInputTextComponent;
  @ViewChild('note') noteComponent: StrenneInputTextComponent;
  @ViewChild('releasedAtPicker') dateComponent: StrennaDatePickerComponent;


  myForm: UntypedFormGroup;
  selectedProfile: any;
  isDirectorSelectedOptionValue: string;
  isBulky: string;
  isPerisheable: string;
  recipientID: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  receptionistMail: string;
  id_strenna: any;
  recipient: any;
  strenna: any;
  response: any;
  now: Date = new Date();

  handleOption: string;




  dateControlCurrentStrenna = new UntypedFormControl();
  validateHandle = new UntypedFormControl();
  validateHour = new UntypedFormControl();
  slotOfWeek: any;



  constructor(private route: ActivatedRoute,
    public translate: TranslateService, private dialog: MatDialog,
    private strenneService: StrenneService, private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder, private formService: FormService, private router: Router, private breakpointObserver: BreakpointObserver) {

    this.id_strenna = this.route.snapshot.paramMap.get('id_strenna');

    this.myForm = this.formBuilder.group({
      validateHandle: ['', Validators.required],
      validateHour: ['', Validators.required],
    });
  }



  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => { this.isDesktopView = !result.matches; });

    const passedStrenna = history.state['data'];

    if (passedStrenna === undefined)
      this.router.navigate(["user-page"]);
    else {

      this.recipient = passedStrenna.recipient;
      this.strenna = passedStrenna.strenna;
      this.response = passedStrenna.strennaResponse;
    }

  }

  saveStrenna() {
    let extendedStrenna = this.extendedStrennaMap();
    (this.strenneService.addStrenna(extendedStrenna))
      .pipe()
      .subscribe(r => {
        if (r === 1) {
          this.dialogService.openSuccessDialog('strennaForm.saveSuccessful');
          this.myForm.reset();
          this.router.navigate(["user-page"]);

        }
      });
    this.dialog.closeAll();
    this.myForm.reset();
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

  selectProfile(profile: Profile) {
    this.selectedProfile = profile;
  }


  disableButton(): boolean {
    if (this.selectedHandleOption === 'donated' || this.selectedHandleOption === 'refused') {
      return false;
    } else {
      if (!this.dateComponent || !this.dateComponent.getText()) {
        return true;
      }
      if (this.myForm.valid)
        return false;
      return true;
    }
  }



  invokeHandle() {
    this.response.handling = this.selectedHandleOption;
    if (this.selectedHandleOption === 'donated' || this.selectedHandleOption === 'refused') {
      this.handleStrennaForUser();
      return;
    }

    if (this.selectedProfile === null || this.selectedProfile === undefined) {
      this.response.withdrawal_date = this.dateComponent.getText();
      this.response.withdrawal_hour = this.selectedHourOption;
      this.handleStrennaForUser();
      return;
    }

    const id = this.selectedProfile.userid_1;
    const firstName = this.selectedProfile.first_name;
    const lastName = this.selectedProfile.last_name;
    const email = this.selectedProfile.email;

    this.response.delegate = id;
    this.response.delegate_mail = email
    this.response.delegate_name = firstName;
    this.response.delegate_surname = lastName;
    this.response.withdrawal_date = this.dateComponent.getText();
    this.response.withdrawal_hour = this.selectedHourOption;

    this.handleStrennaForUser();
  }

  handleStrennaForUser() {
    let strennaResponse = this.strennaResponseMap();



    this.strenneService.handleStrennaForUser(strennaResponse)
      .pipe()
      .subscribe(r => {
        if (r === 1) {
          this.dialogService.openSuccessDialog('strennaForm.managedSuccessful');
        }
      });


    this.dialog.closeAll();
    this.router.navigate(["user-page"]).then(()=> {window.location.reload()} );

  }

  goBack() {
    this.router.navigate(["/user-page"]);
  }

  strennaResponseMap(): StrennaResponseDTO {

    const idstrenna = this.strenna.id_strenna;


    if (this.selectedProfile === null || this.selectedProfile === undefined) {
      const strennaRsponse = {
        id_response: null,
        id_strenna: idstrenna,
        handling: this.response.handling,
        user_id_withdrawal_strenna: this.response.user_id_withdrawal_strenna,

        withdrawal_date: this.dateComponent ? this.dateComponent.getText() : null,
        withdrawal_hour: this.selectedHourOption

      } as StrennaResponseDTO
      return strennaRsponse;
    }


    const id = this.selectedProfile.user_id;
    const firstName = this.selectedProfile.user_first_name;
    const lastName = this.selectedProfile.user_last_name;
    const email = this.selectedProfile.user_email;

    const strennaRsponse = {
      id_response: null,
      id_strenna: idstrenna,
      handling: this.response.handling,
      user_id_withdrawal_strenna: this.response.user_id_withdrawal_strenna,
      delegate: id,
      delegate_mail: email,
      delegate_name: firstName,
      delegate_surname: lastName,
      withdrawal_date: this.dateComponent.getText(),
      withdrawal_hour: this.selectedHourOption

    } as StrennaResponseDTO

    return strennaRsponse;

  }

  withdrawalDateChange() {
    if (this.dateComponent && this.dateComponent.getText()) {
      if (!this.slotOfWeek) {
        this.strenneService.getSlotOfWeek().pipe().subscribe(
          (response: RestResponse<SlotOfWeekDto>) => {
            if (response.output) {
              this.slotOfWeek = this.getMapFromSlotOfWeek(response.output);
              var clearHourOption: boolean = true;
              const slots = this.slotOfWeek.get(
                this.getDayOfWeekLowerCase(this.dateComponent.getText()));
              this.hourOptions = [];
              slots.forEach(element => {
                if (element && this.selectedHourOption && this.selectedHourOption === element) {
                  clearHourOption = false;
                }
                this.hourOptions.push({
                  value: element,
                  viewValue: element
                });
              });
              if (clearHourOption) {
                this.selectedHourOption = null;
              }
            }
          }
        );
      } else {
        var clearHourOption: boolean = true;
        const slots = this.slotOfWeek.get(
          this.getDayOfWeekLowerCase(this.dateComponent.getText()));
        this.hourOptions = [];
        slots.forEach(element => {
          if (element && this.selectedHourOption && this.selectedHourOption === element) {
            clearHourOption = false;
          }
          this.hourOptions.push({
            value: element,
            viewValue: element
          });
        });
        if (clearHourOption) {
          this.selectedHourOption = null;
        }
      }
    } else {
      this.selectedHourOption = null;
    }
  }

  private getMapFromSlotOfWeek(slotOfWeek: SlotOfWeekDto) {
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


  onClickInvokeHandle(element) {
    if (this.selectedHandleOption === 'donated' || this.selectedHandleOption === 'refused') {
      this.invokeHandle();
      return;
    }
    const dataInfo = {
      contentText: this.translate.instant('userStrenne.confirmAccept'),
      icon: 'error_outline',
      btnRight: this.translate.instant('confirm.label'),
      btnLeft: this.translate.instant('strennaForm.cancel'),
      onBtnRight: () => { this.onInvokeHandleConfirm(element); },
    };
    this.dialog.open(SimpleDialogComponent, {
      id: 'common-dialog',
      width: '550px',
      disableClose: false,
      data: dataInfo
    });

  }


  onInvokeHandleConfirm = (element: any) => {
    this.dialog.closeAll();
    this.invokeHandle();
    this.dialogService.openSuccessDialog('strennaForm.managedSuccessful').afterClosed();
    this.router.navigate(['user-page']);
  }
}