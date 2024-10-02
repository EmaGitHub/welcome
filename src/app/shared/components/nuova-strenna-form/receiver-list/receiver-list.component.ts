import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedStrenneManagementService } from 'src/app/pages/strenne-management/shared-strenne-management.service';
import { StrennaInfo } from 'src/app/pages/strenne-management/strenna-list-item.model';
import { StrenneManagementService } from 'src/app/pages/strenne-management/strenne-management.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Utility } from 'src/app/shared/utils/utility';
import { SimpleDialogComponent } from '../../simple-dialog/simple-dialog.component';
import { showedColumns } from './constant';


@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.css'],
})
export class ReceiverListComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sortTable: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<StrennaInfo>();
  displayedColumns: string[];
  selection = new SelectionModel<StrennaInfo>(true, []);
  tableItems: any[] = [];
  showedColumns = showedColumns;
  collectionSize: any = 0;
  strennaFilter: any;
  lastStrennaFilter: any;
  strenneMap = {};
  isStrennaAdmin: boolean = false;
  isStrennaOperator: boolean = false;
  @Output() changeSelected = new EventEmitter<any>();
  firstTime : boolean = true ; 

  constructor(
    private strenneManagementService: StrenneManagementService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private translate: TranslateService,
    private sharedStrenneManagement: SharedStrenneManagementService,
    private strenneService: StrenneService,
    private userService: UserService

  ) {
    this.setDisplayedColumns();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<StrennaInfo>();
    this.getFilteredStrenneList();
    this.isStrennaAdmin = this.userService.getRoleForUser().isStrenneAdmin;
    this.isStrennaOperator = this.userService.getRoleForUser().isStrenneOperator;

    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase().replace(" ", "");
      }
      return data[sortHeaderId];
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sortTable;
    this.dataSource.paginator = this.paginator;


  }

  ngAfterViewChecked() {
    if(this.firstTime){
    const targetElement = document.querySelector('.mat-focus-indicator.mat-paginator-navigation-next.mat-icon-button.mat-button-base');
    const newDiv = document.createElement('div');
    newDiv.classList.add('numero-pagina');
    newDiv.style.color = 'aliceblue';
    newDiv.style.backgroundColor = '#0152E8';
    newDiv.style.width = '25px';
    newDiv.style.height = '25px';
    newDiv.style.verticalAlign = 'middle';
    newDiv.style.textAlign = 'center';
    targetElement.parentNode.insertBefore(newDiv, targetElement);
    this.firstTime = false  ;
    }
    const list = document.getElementsByClassName('numero-pagina');
    list[0].innerHTML = ((this.paginator.pageIndex) + 1).toString();

  }

  setDisplayedColumns() {
    this.displayedColumns = showedColumns;
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
    let periods = null;
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
      periods = strenna.periods;

    }


    if (this.isStrennaAdmin) {
      this.strenneService.getFilteredStrenneAdmin(
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
        page , 
        periods
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
              };
              infoList.push(info);
              this.strenneMap[element.strenna.id_strenna] = element;
            });
  
          }
          this.dataSource.data = infoList;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortTable;
          this.tableItems = infoList;
          return infoList;
        });
    }else {
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
      page , 
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
            };
            infoList.push(info);
            this.strenneMap[element.strenna.id_strenna] = element;
          });
        }
        this.dataSource.data = infoList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortTable;
        this.tableItems = infoList;
        return infoList;
      });
    }
  }


  deleteStrenna(strennaId: string) {
    this.strenneManagementService.deleteStrenna(strennaId).pipe()
      .subscribe((response) => {
        if (response.output) {
          this.dialogService.openSuccessDialog('strennaForm.deleteSuccessfull');
        }
      });
    this.dialog.closeAll();
    this.getFilteredStrenneList(this.lastStrennaFilter);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  navigateToShowDetails(strennaId: number) {
    this.router.navigate(['show-details'], { state: { data: this.strenneMap[strennaId] } });
  }
  navigateToEdit(strennaId: number) {
    this.router.navigate(['edit-strenna'], { state: { data: this.strenneMap[strennaId] } });
  }

  formatData(data: string): string {
    const formattedDate = formatDate(data, 'dd/MM/yy', 'en-US');
    return formattedDate;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const filteredData = this.dataSource.data.filter((element) => {
      return !element.is_director_or_board && !this.checkElementDisabled(element);
    });
    const numRows = filteredData.length;
    this.sharedStrenneManagement.setIsAllSelected(numSelected === numRows);


    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    const filteredData = this.dataSource.data.filter((element) => {
      return !element.is_director_or_board && !this.checkElementDisabled(element);
    });

    this.selection.select(...filteredData);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userid}`;
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


  checkboxValue(row?: any) {
    return this.selection.isSelected(row);
  }

  isAnySelected() {
    const numSelected = this.selection.selected.length;
    this.changeSelected.emit(numSelected > 0);
  }

  downloadExcel() {
    const strennaToSearch = this.lastStrennaFilter;
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
    let periods = null ; 
    if (strennaToSearch) {
      id_receiver = strennaToSearch.id_receiver;
      id_strenna = strennaToSearch.id_strenna;
      is_director = strennaToSearch.is_director;
      sender = strennaToSearch.sender;
      handling = strennaToSearch.handling;
      method = strennaToSearch.method;
      strenna_type = strennaToSearch.strenna_type;
      bulky = strennaToSearch.bulky;
      perishable = strennaToSearch.perishable;
      date = strennaToSearch.date;
      withdrawal_date = strennaToSearch.withdrawal_date;
      status = strennaToSearch.status;
      periods = strennaToSearch.periods;
    }
    this.strenneService.generateExcelForAdmin(
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
      periods
    ).pipe()

      .subscribe(r => {
        if (r.output) {
          let result = r.output;
          Utility.downloadExcel(result.filename, result.base64);
        }
      });
  }

  checkElementDisabled(element): boolean {
    const disabled: boolean = element.status === 'cancelled' || element.status === 'delivered'
      || element.status === 'refused' || element.status === 'donated';
    return disabled;
  }

  currentPageTable: number = 1;
  pageSize: number = 10;
  changePageMobile(page) {
    this.currentPageTable = page;
  }

  getItemsForPage() {
    const startIndex = (this.currentPageTable - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.data.slice(startIndex, endIndex);
  }

  changePage(page) {
    this.currentPageTable = page;
  }

  changePageSize(pageSize) {
    this.pageSize = pageSize;
  }

  getTotalPages() {
    return Math.ceil(this.dataSource.data.length / this.pageSize);
  }

}