import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { showedColumnsUser } from 'src/app/shared/components/nuova-strenna-form/receiver-list/constant';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { StrennaInfo } from '../strenne-management/strenna-list-item.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, AfterViewInit {

  isDesktopView = true;

  externalLink: string;

  customTitle: string;
  subtitle: string;
  dataSource = new MatTableDataSource<StrennaInfo>();
  @ViewChild(MatSort, { static: false }) sortTable: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumnsUser: string[];
  selection = new SelectionModel<StrennaInfo>(true, []);
  tableItems: any[] = [];
  showedColumnsUser = showedColumnsUser;
  collectionSize: any = 0;
  strennaFilter: any;
  lastStrennaFilter: any;
  strenneMap = {};


  constructor(
    private strenneService: StrenneService,
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {

    this.customTitle = "userStrenne.strenneManagement";
    this.subtitle = "userStrenne.strenneManagementSubtitle";
    this.setDisplayedColumns();

  }



  ngOnInit() {

    

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => { this.isDesktopView = !result.matches; });

    this.dataSource = new MatTableDataSource<StrennaInfo>();
    this.getFilteredStrenneList();

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

  setDisplayedColumns() {
    this.displayedColumnsUser = showedColumnsUser;
  }

  getFilteredStrenneList(strenna = undefined) {
    this.lastStrennaFilter = strenna;

    let max_rows = null;
    let page = null;
    if (strenna) {
      max_rows = strenna.max_rows;
      page = strenna.page;
    }
    this.strenneService.getStrenneForUser(
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
              is_perisheable: element.strenna.perisheable,
              is_bulky: element.strenna.bulky
            };
            infoList.push(info);
            this.strenneMap[element.strenna.id_strenna] = element;

          });
          this.tableItems;
        }
        this.dataSource.data = infoList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortTable;


        return infoList;
      });
  }

  announceSortChange(sortState: Sort) {


    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




  formatData(data: string): string {
    const formattedDate = formatDate(data, 'dd/MM/yy', 'en-US');
    return formattedDate;
  }


  navigateToManage(id_strenna: number) {
    this.router.navigate(['strenna', id_strenna], { state: { data: this.strenneMap[id_strenna] } });
  }

  navigateToShowDetails(id_strenna: number) {
    this.router.navigate(['show-details-user', id_strenna], { state: { data: {
      strenna : this.strenneMap[id_strenna],
      from : "user-page"
    } } });
  }

  showContextMenu = false;
  selectedOption: string | undefined;

  toggleContextMenu() {
    this.showContextMenu = !this.showContextMenu;
  }

  handleOptionSelected(option: string) {
    this.selectedOption = option;
    this.showContextMenu = false;
  }

  changePageMobile(page) {
    this.currentPageMobile = page;

  }

  currentPageMobile: number = 1;
  pageSizeMobile: number = 12;



  getItemsForPageMobile() {
    const startIndex = (this.currentPageMobile - 1) * (1*this.pageSizeMobile);
    const endIndex = (startIndex + (this.pageSizeMobile * 1 ));
    return this.dataSource.data.slice(startIndex, endIndex);
  }

  changePageSizeMobile(pageSize) {
    this.pageSizeMobile = pageSize;
  }

  getTotalPagesMobile() {
    return Math.ceil(this.dataSource.data.length / this.pageSizeMobile);
  }

  firstTime: boolean = true;
  ngAfterViewChecked() {
    if (this.dataSource.paginator) {
      if (this.firstTime) {
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
        this.firstTime = false;
      }
      const list = document.getElementsByClassName('numero-pagina');
      list[0].innerHTML = ((this.paginator.pageIndex) + 1).toString();
    }
  }

  checkHideBackRouterLink(){
    //hide back router link if the user is only strenne user
    return !(this.userService.getRoleForUser().isStrenneOperator || this.userService.getRoleForUser().isStrenneAdmin || this.userService.getRoleForUser().isCountryAdmin
    || this.userService.getRoleForUser().isGlobalAdmin || this.userService.getRoleForUser().isSiteAdmin);
  }

}