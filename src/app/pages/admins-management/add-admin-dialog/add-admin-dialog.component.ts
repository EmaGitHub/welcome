import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../../shared/model/profile.model';
import {AdminsManagementService} from '../admins-management.service';
import {MatSelect} from '@angular/material/select';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AdminsManagementType} from '../../../shared/constants/AdminsManagementType';

@Component({
  selector: 'app-add-admin-dialog',
  templateUrl: './add-admin-dialog.component.html',
  styleUrls: ['./add-admin-dialog.component.scss']
})
export class AddAdminDialogComponent implements OnInit {

  countrySelected: string;
  citySelected: string;
  @ViewChild('sitesSelect') sitesSelect: MatSelect;
  selectedSites = [];
  countryList: any;
  cityList: string[];
  filteredCityList: string[];
  siteList: any;
  adminType: AdminsManagementType;
  selectedProfile: Profile;

  constructor(private adminsManagementService: AdminsManagementService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.adminType = this.data.adminType;
    this.adminsManagementService.countryList.pipe().subscribe((countryList: any ) => {
      this.countryList = countryList;
    });
    this.adminsManagementService.cityList.pipe().subscribe((cityList: string[] ) => {
      this.cityList = cityList;
      this.filteredCityList = cityList;
    });
    this.adminsManagementService.siteList.pipe().subscribe((siteList: any ) => {
      this.siteList = siteList;
    });
  }

  public get adminsManagementType(): typeof AdminsManagementType {
    return AdminsManagementType;
  }

  loadCities() {
    // Prendo la lista di cities per country selected
    if (this.adminType === AdminsManagementType.SITE) {
      this.adminsManagementService.getAvailableCityForAdmin(this.countrySelected);
    }
  }

  loadSites() {
    // Prendo la lista di sites per country/city selected
    if (this.adminType === AdminsManagementType.SITE) {
      this.adminsManagementService.getAvailableSiteForAdmin(this.countrySelected, this.citySelected);
    }
  }

  addAdmin() {
    if (this.adminType === AdminsManagementType.SITE) {
      const admin = {
        userId: this.selectedProfile.userid_1,
        country: this.countrySelected,
        name: this.selectedProfile.first_name,
        lastname: this.selectedProfile.last_name,
        idSite: this.selectedSites.map((site) => {
          return site.idSite;
        })
      };
      console.log('ADMIN', admin);
      this.adminsManagementService.saveSiteAdmin(admin);
    } else {
      const admin = {
        userId: this.selectedProfile.userid_1,
        country: this.countrySelected,
        name: this.selectedProfile.first_name,
        lastname: this.selectedProfile.last_name
      };
      console.log('ADMIN', admin);
      this.adminsManagementService.saveCountryAdmin(admin);
    }
  }

  removeSite(site): void {
    const index = this.selectedSites.indexOf(site);

    if (index >= 0) {
      this.selectedSites.splice(index, 1);
      this.sitesSelect.options.find(option => option.value === site)?.deselect();
    }
  }

  selectProfile(profile: Profile) {
    this.selectedProfile = profile;
  }

  filterCityList(newValue) {
    this.filteredCityList = this.cityList.filter((city: string) => {
      // tslint:disable-next-line:max-line-length
      return city.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
    });
  }

}
