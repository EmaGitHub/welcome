import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StrenneManagementService } from './strenne-management.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NuovaStrennaFormComponent } from 'src/app/shared/components/nuova-strenna-form/nuova-strenna-form.component';
import { ReceiverListComponent } from 'src/app/shared/components/nuova-strenna-form/receiver-list/receiver-list.component';
import { showedColumns } from 'src/app/shared/components/nuova-strenna-form/receiver-list/constant';
import { SharedStrenneManagementService } from './shared-strenne-management.service';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strenne-management',
  templateUrl: './strenne-management.component.html',
  styleUrls: ['./strenne-management.component.css']
})
export class StrenneManagementComponent implements OnInit, OnDestroy {

  @ViewChild(ReceiverListComponent) receiverListComponent: ReceiverListComponent;

  showedColumns = showedColumns;
  displayedColumns: any[];
  selectedRecords: any[];
  collectionSize: any = 0;
  isAnySelected: boolean ;
  list: any[] = [];
  reminderButton : boolean = true; 

  constructor(private router: Router,
    private dialog: MatDialog,
    private strenneManagementService: StrenneManagementService,
    private sharedStrenneManagement: SharedStrenneManagementService,
    private strenneService: StrenneService,
    private dialogService: DialogService  , 
    private translate: TranslateService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  changeTab(event: MatTabChangeEvent) {}

  addStrenna() {
    const dialogRef = this.dialog.open(NuovaStrennaFormComponent, {
      width: '90%',
      maxHeight: '200vh', 
    });
    dialogRef.afterClosed().subscribe(savedStrenna => {
      if (savedStrenna) {
        this.searchStrenna(undefined);
      }
    });
    dialogRef.componentInstance.savedStrenna.subscribe((isSaved: any) => {
      if (isSaved) {
        this.searchStrenna(undefined);
      }
    });
  }

  onUpdate() {}

  searchStrenna(strenna) {
    this.receiverListComponent.getFilteredStrenneList(strenna);
  }

  onClickCallReminder() {
    const dataInfo = {
      contentText: this.translate.instant('strennaForm.reminderMultiUserMessage'),
      icon: 'error_outline',
      btnRight: this.translate.instant('confirm.label'),
      btnLeft: this.translate.instant('strennaForm.cancel'),
      onBtnRight: () => { this.callReminder(); },
    };
    this.dialog.open(SimpleDialogComponent, {
      id: 'common-dialog',
      width: '550px',
      disableClose: false,
      data: dataInfo
    });
  }

  callReminder() {
    this.dialog.closeAll();
    let risultatoConcatenato = '';

    this.receiverListComponent.selection.selected.forEach((item) => {
      if (!item.is_director_or_board) {
        risultatoConcatenato += item.id_strenna + ',';
      }
    });
    this.strenneService.generateRemainderEmail(risultatoConcatenato).pipe().subscribe((response) => {
      if (response === 1) {
        this.dialogService.openSuccessDialog('strennaForm.solicitValidation').afterClosed().subscribe(x => {
          this.router.navigate(['strenne-management']);
        });
      }
    });
    this.receiverListComponent.selection.clear();
  }

  toggleButton(event) {
    this.reminderButton=!event ;  
  }
}