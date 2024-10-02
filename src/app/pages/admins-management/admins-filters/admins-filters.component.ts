import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminsManagementService} from '../admins-management.service';
import {AdminsManagementType} from '../../../shared/constants/AdminsManagementType';
import {UserRole} from '../../../shared/model/user-role.model';
import {UserService} from '../../../shared/service/user.service';
import {Site} from '../../../shared/model/site.model';

@Component({
  selector: 'app-admins-filters',
  templateUrl: './admins-filters.component.html',
  styleUrls: ['./admins-filters.component.css']
})
export class AdminsFiltersComponent implements OnInit {

  countrySelected = '';
  citySelected = '';
  siteSelected: string;
  name: string;
  userId: string;
  countryList: any;
  cityList: string[];
  filteredCityList: string[];
  siteList: any;
  filteredSiteList: any;
  adminsTypeSelected: AdminsManagementType;
  @Output() filter = new EventEmitter<any>();
  userRoles: UserRole;

  constructor(private adminsManagementService: AdminsManagementService, private userService: UserService) { }

  public get adminsManagementType(): typeof AdminsManagementType {
    return AdminsManagementType;
  }

  ngOnInit(): void {
    this.userRoles = this.userService.getRoleForUser();
    this.adminsManagementService.adminsManagementSelected.subscribe((adminsTypeSelected: AdminsManagementType) => {
      this.adminsTypeSelected = adminsTypeSelected;
      this.clearFilter();
    });
    this.adminsManagementService.getAvailableCountryForAdmin();
    this.adminsManagementService.countryList.pipe().subscribe((countryList: string[] ) => {
      this.countryList = countryList;
    });
    this.adminsManagementService.cityList.pipe().subscribe((cityList: string[] ) => {
      this.cityList = cityList;
      this.filteredCityList = cityList;
    });
    this.adminsManagementService.siteList.pipe().subscribe((siteList: any ) => {
      this.siteList = siteList;
      this.filteredSiteList = siteList;
    });
  }

  loadCities() {
    // Prendo la lista di cities per country selected
    if (this.adminsTypeSelected === AdminsManagementType.SITE) {
      this.adminsManagementService.getAvailableCityForAdmin(this.countrySelected);
    }
  }

  loadSites() {
    // Prendo la lista di sites per country/city selected
    this.adminsManagementService.getAvailableSiteForAdmin(this.countrySelected, this.citySelected);
  }

  filterCityList(newValue) {
    this.filteredCityList = this.cityList.filter((city: string) => {
      // tslint:disable-next-line:max-line-length
      return city.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
    });
  }

  filterSiteList(newValue) {
    this.filteredSiteList = this.siteList.filter((site: any) => {
      // tslint:disable-next-line:max-line-length
      return site.siteAddress.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
    });
  }

  filterList() {
    this.filter.emit({
      country: this.countrySelected,
      city: this.citySelected,
      idSite: this.siteSelected,
      name: this.name,
      userId: this.userId,
    });
  }

  clearFilter() {
    this.countrySelected = '';
    this.citySelected = '';
    this.siteSelected = null;
    this.name = null;
    this.userId = null;
  }

}
