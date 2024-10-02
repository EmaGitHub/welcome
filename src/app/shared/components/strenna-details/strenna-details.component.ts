import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StrennaInfo } from 'src/app/pages/strenne-management/strenna-list-item.model';
import { StrenneManagementService } from 'src/app/pages/strenne-management/strenne-management.service';
import { ExtendedStrennaDTO } from '../../model/extended-strenna.model';
import { RecipientDTO } from '../../model/recipient.model';
import { Strenna, StrennaDTO } from '../../model/strenna.model';
import { DialogService } from '../../service/dialog.service';
import { StrenneService } from '../../service/strenne.service';
import { UserService } from '../../service/user.service';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-strenna-details',
  templateUrl: './strenna-details.component.html',
  styleUrls: ['./strenna-details.component.css']
})
export class StrennaDetailsComponent implements OnInit {

  collectionSize: any = 0;
  dataSource = new MatTableDataSource<StrennaInfo>();
  tableItems: any[] = [];
  @Input() customRouterLink: string;
  @Input() linkText: string;
  @Input() title: string;
  @Input() subtitle: string;

  lastStrennaFilter: any;

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
  isStrennaAdmin: boolean;

  constructor(private route: ActivatedRoute,
    private strenneManagementService: StrenneManagementService,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private translate: TranslateService,
    private strenneService: StrenneService,
    private userService: UserService) {
    this.id_strenna = +this.route.snapshot.paramMap.get('id_strenna');
  }

  ngOnInit() {

    const passedStrenna = history.state['data'];
    if (passedStrenna === undefined)
      this.router.navigate(["strenne-management"]);
    this.recipient = passedStrenna.recipient;
    this.strenna = passedStrenna.strenna;
    this.response = passedStrenna.strennaResponse;


    this.isStrennaAdmin = this.userService.getRoleForUser().isStrenneAdmin;
  }

  formatData(data: string): string {
    if (data) {
      const formattedDate = formatDate(data, 'dd/MM/yy', 'en-US');
      return formattedDate;
    } else {
      return "";
    }
  }

  navigateToEdit(id_strenna: number) {
    const strennaToPass = {
      recipient: this.recipient,
      strenna: this.strenna,
      strennaResponse: this.response
    };
    this.router.navigate(['edit-strenna'], { state: { data: strennaToPass } });
  }



  getFilteredStrenneList(strenna = undefined) {
    this.lastStrennaFilter = strenna;
    let id_receiver = null;
    let id_strenna = null;
    let is_director = null;
    let sender = null;
    let handling = null;
    let method = null;
    let strenna_type = null;
    let bulky = null;
    let perishable = null;
    let date = null;
    let withdrawal_date = null;
    let status = null;
    let max_rows = null;
    let page = null;
    if (strenna) {
      id_receiver = strenna.id_receiver;
      id_strenna = strenna.id_strenna;
      is_director = strenna.is_director;
      sender = strenna.sender;
      handling = strenna.handling;
      method = strenna.method;
      strenna_type = strenna.strenna_type;
      bulky = strenna.bulky;
      perishable = strenna.perishable;
      date = strenna.date;
      withdrawal_date = strenna.withdrawal_date;
      status = strenna.status;
      max_rows = strenna.max_rows;
      page = strenna.page;
    }
    this.strenneManagementService.getFilteredStrenneList(
      id_receiver,
      id_strenna,
      is_director,
      sender,
      handling,
      method,
      strenna_type,
      bulky,
      perishable,
      date,
      withdrawal_date,
      status,
      max_rows,
      page
    ).pipe()

      .subscribe(r => {




        const infoList: StrennaInfo[] = [];
        this.collectionSize = r?.output?.totalCount;
        const result = r?.output?.list;
        if (!!result) {
          result.forEach(element => {
            const info: StrennaInfo = {
              name: element.recipient.user_name + ' ' + element.recipient.user_surname,
              id_strenna: element.strenna.id_strenna,
              is_director_or_board: element.recipient.is_director_or_board,
              sender: element.strenna.sender,
              date: element.strenna.date,
              status: element.strenna.status,
              is_perisheable: element.strenna.is_perisheable
            };
            infoList.push(info);
          });
          this.tableItems;
        }
        this.dataSource.data = infoList;
        return infoList;
      });
  }

  onClickDeleteStrenna(element) {
    const dataInfo = {
      contentText: this.translate.instant('strennaForm.delete'),
      icon: 'error_outline',
      btnRight: this.translate.instant('confirm.label'),
      btnLeft: this.translate.instant('strennaForm.cancel'),
      onBtnRight: () => { this.onDeleteConfirm(element); },
    };
    this.dialog.open(SimpleDialogComponent, {
      id: 'common-dialog',
      width: '550px',
      disableClose: false,
      data: dataInfo
    });

  }

  onDeleteConfirm = (element: any) => {
    this.dialog.closeAll();
    this.strenneManagementService.deleteStrenna(element).pipe()
      .subscribe(
        (response) => {
          if (response.output) {
            this.dialogService.openSuccessDialog('strennaForm.deleteSuccessfull').afterClosed().subscribe(x => {
              this.router.navigate(['strenne-management']);
            });
          }
        });

  }








  onClickCallReminder() {
    const dataInfo = {
      contentText: this.translate.instant('strennaForm.reminderMessage'),
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


    this.strenneService.generateRemainderEmail(this.strenna.id_strenna).pipe().subscribe((response) => {
      if (response === 1) {
        this.dialogService.openSuccessDialog('strennaForm.solicitValidation');

      }
    });

  }

  onClickCallReject() {
    const dataInfo = {
      contentText: this.translate.instant('strennaForm.rejectMessage'),
      icon: 'error_outline',
      btnRight: this.translate.instant('confirm.label'),
      btnLeft: this.translate.instant('strennaForm.cancel'),
      onBtnRight: () => { this.callReject(); },
    };
    this.dialog.open(SimpleDialogComponent, {
      id: 'common-dialog',
      width: '550px',
      disableClose: false,
      data: dataInfo
    });
  }

  callReject() {
    this.dialog.closeAll();
    this.strenneService.refuseStrennaByIdForAdmin(this.strenna.id_strenna).pipe().subscribe((response) => {
      if (response === 1) {
        this.dialogService.openSuccessDialog('strennaForm.deleteSuccessfull').afterClosed().subscribe(x => {
          this.router.navigate(['strenne-management']);
        });
      }
    });
  }

  checkElementDisabled(element): boolean {
    const disabled: boolean = element.status === 'cancelled' || element.status === 'delivered'
      || element.status === 'refused' || element.status === 'donated';
    return disabled;
  }

}
