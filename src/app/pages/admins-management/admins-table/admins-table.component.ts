import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {AdminsManagementService} from '../admins-management.service';
import {AdminsManagementType} from '../../../shared/constants/AdminsManagementType';
import {AdminListItem} from '../admin-list-item.model';
import {filter} from 'rxjs/operators';
import {PagedList} from '../../../shared/model/message';

@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.scss']
})
export class AdminsTableComponent implements OnInit {

  displayedColumns: string[];
  adminsTypeSelected: AdminsManagementType;
  dataSource = new MatTableDataSource<AdminListItem>();
  selection = new SelectionModel<AdminListItem>(true, []);

  constructor(private adminsManagementService: AdminsManagementService) { }

  ngOnInit(): void {
    this.adminsManagementService.adminsManagementSelected.subscribe((adminsTypeSelected: AdminsManagementType) => {
      this.adminsTypeSelected = adminsTypeSelected;
      this.setDisplayedColumns();
    });
    this.adminsManagementService.adminSiteList
        .pipe(filter(adminList => !!adminList))
        .subscribe((adminSiteList: PagedList<AdminListItem>) => {
          this.dataSource = new MatTableDataSource<AdminListItem>(adminSiteList.list);
    });
    this.adminsManagementService.adminCountryList
        .pipe(filter(adminList => !!adminList))
        .subscribe((adminSiteList: PagedList<AdminListItem>) => {
          this.dataSource = new MatTableDataSource<AdminListItem>(adminSiteList.list);
    });
    this.adminsManagementService.saveAdminDone.pipe().subscribe((result) => {
      if (result.action === 'DELETE') {
        this.selection.clear();
      }
    });
  }

  setDisplayedColumns() {
    if (this.adminsTypeSelected === AdminsManagementType.SITE) {
      this.displayedColumns = ['userId', 'name', 'surname', 'site', 'delete'];
    } else {
      this.displayedColumns = ['userId', 'name', 'surname', 'country', 'delete'];
    }
  }

  deleteAdmin(row: AdminListItem) {
    console.log('ADMIN', row);
    if (this.adminsTypeSelected === AdminsManagementType.SITE) {
      this.adminsManagementService.deleteSiteAdmin([
        {
          userId: row.userId,
          siteId: row.idSite
        }
      ]);
    } else {
      this.adminsManagementService.deleteCountryAdmin([
        {
          userId: row.userId,
          country: row.country
        }
      ]);
    }
  }

  deleteAdminList() {
    if (this.adminsTypeSelected === AdminsManagementType.SITE) {
      this.adminsManagementService.deleteSiteAdmin(this.selection.selected.map((admin: AdminListItem) => {
        return {
          userId: admin.userId,
          siteId: admin.idSite
        };
      }));
    } else {
      this.adminsManagementService.deleteCountryAdmin(this.selection.selected.map((admin: AdminListItem) => {
        return {
          userId: admin.userId,
          country: admin.country
        };
      }));
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userid}`;
  }

}
