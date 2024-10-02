import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { showedColumns } from 'src/app/shared/components/nuova-strenna-form/receiver-list/constant';
import { StrennaDatePickerComponent } from 'src/app/shared/components/nuova-strenna-form/strenna-date-picker/strenna-date-picker.component';
import { StrenneInputTextComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-input-text/strenne-input-text.component';
import { StrenneSearchReceiverComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-search-receiver/strenne-search-receiver.component';
import { StrenneSearchSenderComponent } from 'src/app/shared/components/nuova-strenna-form/strenne-search-sender/strenne-search-sender.component';
import { RestResponse } from 'src/app/shared/model/message';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { UserService } from 'src/app/shared/service/user.service';
import { StrennaInfo } from '../strenna-list-item.model';
import { StrenneManagementService } from '../strenne-management.service';

@Component({
  selector: 'app-expansion-panel-filters',
  templateUrl: './expansion-panel-filters.component.html',
  styleUrls: ['./expansion-panel-filters.component.css']
})
export class ExpansionPanelFiltersComponent implements OnInit {
  @Output() searchStrenna = new EventEmitter<any>();

  @ViewChild('strennaReceiver') strenneSearchReceiverComponent: StrenneSearchReceiverComponent;
  @ViewChild('strennaSender') strenneSearchSenderComponent: StrenneSearchSenderComponent;
  @ViewChild('idStrenna') strennaIdInputComponent: StrenneInputTextComponent;
  @ViewChild('date') dateComponent: StrennaDatePickerComponent;
  @ViewChild('withdrawalDate') withdrawalDateComponent: StrennaDatePickerComponent;
  isDirectorSelectedOptionValue: string;
  withdrawalSelectedOptionValue: string;
  selectedGiftOptionValue: string;
  selectedBulkyOptionValue: string;
  selectedPerishableOptionValue: string;
  selectedStatusOptionValue: string;
  tableItems: any[] = [];
  showedColumns = showedColumns;
  displayedColumns: any[];
  selectedRecords: any[];
  collectionSize: any = 0;
  dataSource = new MatTableDataSource<StrennaInfo>();
  recipientID: any;
  recipientEmail: any;
  recipientFirstName: any;
  recipientLastName: any;
  sender: any;
  isStrennaAdmin: any = false;

  constructor(private router: Router, private dialog: MatDialog,
    private strenneManagementService: StrenneManagementService, private userService: UserService, private strenneService: StrenneService
  ) {
  }

  giftOptions: any[] = [
    { value: 'giftOptionBottle', viewValue: 'strennaForm.giftOptionBottle' },
    { value: 'giftOptionPanettone', viewValue: 'strennaForm.giftOptionPanettone' },
    { value: 'giftOptionCalendar', viewValue: 'strennaForm.giftOptionCalendar' },
    { value: 'giftOptionFood', viewValue: 'strennaForm.giftOptionFood' },
    { value: 'giftOptionToCheck', viewValue: 'strennaForm.giftOptionToCheck' },
    { value: 'giftOptionOther', viewValue: 'strennaForm.giftOptionOther' }
  ];
  statusOptions: any[] = [
    { value: 'toBeWithdrawn', viewValue: 'strennaForm.statusOptionToBeWithdrawn' },
    { value: 'delivered', viewValue: 'strennaForm.statusOptionDelivered' },
    { value: 'refused', viewValue: 'strennaForm.statusOptionRejected' },
    { value: 'donated', viewValue: 'strennaForm.statusOptionDonation' },
    { value: 'cancelled', viewValue: 'strennaForm.statusOptionCancelled' }
  ];

  selectedYearOptionValue;
  previousYears: any[];

  ngOnInit(): void {
    this.isStrennaAdmin = this.userService.getRoleForUser().isStrenneAdmin;
    if (this.isStrennaAdmin) {
      this.strenneService.getAvailablePeriods().pipe(map((periods: RestResponse<any>) => {
        return periods;
      })
      ).subscribe((arrayOfStrings: RestResponse<any>) => {
        this.previousYears = arrayOfStrings.output;
      });
    }
  }


  cleanFilters(): void {
    this.strennaIdInputComponent.cleanText();
    this.isDirectorSelectedOptionValue = null;
    this.withdrawalSelectedOptionValue = null;
    this.selectedGiftOptionValue = null;
    this.selectedBulkyOptionValue = null;
    this.selectedPerishableOptionValue = null;
    this.selectedStatusOptionValue = null;
    this.withdrawalDateComponent.cleanText();
    this.dateComponent.cleanText();
    this.strenneSearchReceiverComponent.clearText();
    this.strenneSearchSenderComponent.clearText();
    this.selectedYearOptionValue = null;
  }


  onEnter($event) {
    if ($event.keyCode === 13) {
      this.getFilteredStrenneList();
    }
  }

  handleSelectedReceiver(event) {
    if (event) {
      const user = event;
      this.recipientID = user.user_id;
      this.recipientFirstName = user.user_first_name;
      this.recipientLastName = user.user_last_name;
    } else {
      this.recipientID = null;
      this.recipientFirstName = null;
      this.recipientLastName = null;
    }
  }


  handleSelectedSender(event) {
    if (event) {
      const user = event;
      this.sender = user.sender;

    } else {
      this.sender = null;
    }
  }
  getFilteredStrenneList() {
    const getStrenneEvent = {
      id_receiver: this.recipientID,
      id_strenna: this.strennaIdInputComponent.getText() ? this.strennaIdInputComponent.getText() : null,
      is_director: this.isDirectorSelectedOptionValue ? this.isDirectorSelectedOptionValue : null,
      sender: this.sender,
      handling: this.withdrawalSelectedOptionValue ? this.withdrawalSelectedOptionValue : null,
      method: null,
      strenna_type: this.selectedGiftOptionValue ? this.selectedGiftOptionValue : null,
      bulky: this.selectedBulkyOptionValue ? this.selectedBulkyOptionValue : null,
      perishable: this.selectedPerishableOptionValue ? this.selectedPerishableOptionValue : null,
      date: this.dateComponent.getText() ? this.dateComponent.getText() : null,
      withdrawal_date: this.withdrawalDateComponent.getText() ? this.withdrawalDateComponent.getText() : null,
      status: this.selectedStatusOptionValue ? this.selectedStatusOptionValue : null,
      max_rows: null,
      page: null
    };

    const getStrenneEventAdmin = {
      id_receiver: this.recipientID,
      id_strenna: this.strennaIdInputComponent.getText() ? this.strennaIdInputComponent.getText() : null,
      is_director: this.isDirectorSelectedOptionValue ? this.isDirectorSelectedOptionValue : null,
      sender: this.sender,
      handling: this.withdrawalSelectedOptionValue ? this.withdrawalSelectedOptionValue : null,
      method: null,
      strenna_type: this.selectedGiftOptionValue ? this.selectedGiftOptionValue : null,
      bulky: this.selectedBulkyOptionValue ? this.selectedBulkyOptionValue : null,
      perishable: this.selectedPerishableOptionValue ? this.selectedPerishableOptionValue : null,
      date: this.dateComponent.getText() ? this.dateComponent.getText() : null,
      withdrawal_date: this.withdrawalDateComponent.getText() ? this.withdrawalDateComponent.getText() : null,
      status: this.selectedStatusOptionValue ? this.selectedStatusOptionValue : null,
      periods: this.selectedYearOptionValue ? this.selectedYearOptionValue.join(",") : null,
      max_rows: null,
      page: null
    };

    if (this.isStrennaAdmin)
      this.searchStrenna.emit(getStrenneEventAdmin);

    else
      this.searchStrenna.emit(getStrenneEvent);
  }





}
