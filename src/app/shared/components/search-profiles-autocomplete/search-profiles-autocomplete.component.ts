import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { RestResponse } from '../../model/message';
import { Profile } from '../../model/profile.model';
import { SpinnerService } from '../../service/spinner.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-search-profiles-autocomplete',
  templateUrl: './search-profiles-autocomplete.component.html',
  styleUrls: ['./search-profiles-autocomplete.component.css']
})
export class SearchProfilesAutocompleteComponent implements OnInit {
  @Input() profile: Profile;
  @Output() selectProfile = new EventEmitter<Profile>();
  @Input() textLabel: string;
  formControl = new UntypedFormControl();
  formControlSub: Subscription;
  profiles: Profile[];
  customLoading = false;

  constructor(private userService: UserService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.formControlSub = this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => (typeof value === 'string')),
      )
      .subscribe(newValue => {
        this.selectProfile.emit(null);
        this.profiles = [];
        setTimeout( () => {
          if (newValue) {
            this.searchProfile(newValue);
          }
        }, 200);
      });

    if (this.profile) {
      this.formControl.setValue(this.profile);
    }
  }

  searchProfile(name: string): void {
    this.spinnerService.disableLoading();
    this.enableCustomLoading(true);
    this.userService.searchProfile({ name, limit: 10, offset: 1 })
      .subscribe(
        (response: RestResponse<Profile[]>) => {
          this.enableCustomLoading(false);
          if (response.output['user-profiles']) {
            this.profiles = response.output['user-profiles'];
          }
        },
        err => {
          this.enableCustomLoading(false);
          console.error('Profile Sap Not Found!!', err);
        });
  }

  enableCustomLoading(loading: boolean): void {
    this.customLoading = loading;
  }

  displayFn(profile: Profile) {
    return profile ? profile.first_name + ' ' + profile.last_name : '';
  }

  onSelectionChange(selectionChange: MatAutocompleteSelectedEvent) {
    this.selectProfile.emit(selectionChange.option.value);
  }

}
