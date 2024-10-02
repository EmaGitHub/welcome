import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AdminsManagementService } from './admins-management.service';
import { AdminsManagementType } from '../../shared/constants/AdminsManagementType';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminDialogComponent } from './add-admin-dialog/add-admin-dialog.component';
import { DialogService } from '../../shared/service/dialog.service';
import { filter } from 'rxjs/operators';
import { PagedList } from '../../shared/model/message';
import { AdminListItem } from './admin-list-item.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserRole } from '../../shared/model/user-role.model';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-admins-management',
  templateUrl: './admins-management.component.html',
  styleUrls: ['./admins-management.component.css']
})
export class AdminsManagementComponent implements OnInit {

  selectedTab: AdminsManagementType = AdminsManagementType.SITE;
  maxRows = 10;
  page = 1;
  filter: any = {};
  totalCount = 10;
  userRoles: UserRole;

  // tslint:disable-next-line:max-line-length
  constructor(private adminsManagementService: AdminsManagementService,
    private dialog: MatDialog, private dialogService: DialogService,
    private userService: UserService) { }

  ngOnInit(): void {

    // alert("admins management");

    this.adminsManagementService.setAdminsManagementSelected(this.selectedTab);
    this.userRoles = this.userService.getRoleForUser();
    this.adminsManagementService.getAdminSiteList();
    this.adminsManagementService.saveAdminDone.pipe().subscribe((result) => {
      this.dialog.closeAll();
      setTimeout(() => {
        if (result.action === 'SAVE') {
          this.dialogService.openSuccessDialog('adminsManagement.addAdminSuccess');
        } else if (result.action === 'DELETE') {
          this.dialogService.openSuccessDialog('adminsManagement.deleteAdminSuccess');
        }
      }, 200);
      this.filterList();
    });
    this.adminsManagementService.adminSiteList
      .pipe(filter(adminList => !!adminList))
      .subscribe((adminSiteList: PagedList<AdminListItem>) => {
        this.totalCount = adminSiteList.totalCount;
      });
    this.adminsManagementService.adminCountryList
      .pipe(filter(adminList => !!adminList))
      .subscribe((adminSiteList: PagedList<AdminListItem>) => {
        this.totalCount = adminSiteList.totalCount;
      });
  }

  public get adminsManagementType(): typeof AdminsManagementType {
    return AdminsManagementType;
  }

  changeTab(event: MatTabChangeEvent) {
    this.selectedTab = event.tab.content.viewContainerRef.element.nativeElement.id;
    this.adminsManagementService.setAdminsManagementSelected(this.selectedTab);
    this.filterList({}, 1);
  }

  // tslint:disable-next-line:no-shadowed-variable
  filterList(filter?: any, page?: number) {
    if (filter) {
      this.filter = filter;
    }
    if (page) {
      this.page = page;
    }
    /*
    if (maxRows) {
      this.maxRows = maxRows;
    }
     */
    if (this.selectedTab === AdminsManagementType.SITE) {
      this.adminsManagementService.getAdminSiteList({
        country: this.filter.country ? this.filter.country : '',
        city: this.filter.city ? this.filter.city : '',
        idSite: this.filter.idSite ? this.filter.idSite : '',
        name: this.filter.name ? this.filter.name : '',
        userId: this.filter.userId ? this.filter.userId : '',
        // maxRows: this.maxRows,
        page: this.page
      });
    } else {
      this.adminsManagementService.getAdminCountryList({
        country: this.filter.country ? this.filter.country : '',
        city: this.filter.city ? this.filter.city : '',
        name: this.filter.name ? this.filter.name : '',
        userId: this.filter.userId ? this.filter.userId : '',
        // maxRows: this.maxRows,
        page: this.page
      });
    }
  }

  addAdmin() {


    this.dialog.open(AddAdminDialogComponent, {
      id: 'add-admin',
      maxWidth: '800px',
      data: {
        adminType: this.selectedTab
      }
    });
  }

}
