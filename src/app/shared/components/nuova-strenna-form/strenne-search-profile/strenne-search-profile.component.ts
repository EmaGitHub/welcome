import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { RestResponse } from 'src/app/shared/model/message';
import { Profile } from 'src/app/shared/model/profile.model';
import { StrenneProfile } from 'src/app/shared/model/strenneProfile.model';
import { StrenneService } from 'src/app/shared/service/strenne.service';
import { UserService } from 'src/app/shared/service/user.service';
import { SpinnerService } from '../../spinner';
import { FormService } from '../form-service.service';


@Component({
  selector: 'app-strenne-search-profile',
  templateUrl: './strenne-search-profile.component.html',
  styleUrls: ['./strenne-search-profile.component.css']
})
export class StrenneSearchProfileComponent implements OnInit {
  @Input() profile: StrenneProfile;
  @Output() selectProfile = new EventEmitter<any>();
  @Input() textLabel: string;
  @Input() controlName: string;
  formControl = new UntypedFormControl();
  formControlSub: Subscription;
  profiles: Profile[];
  customLoading = false;





  constructor(private userService: UserService,
     private spinnerService: SpinnerService, private cdr: ChangeDetectorRef, private strenneService: StrenneService) { }

  ngOnInit(): void {
    this.formControlSub = this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => (typeof value === 'string')),
      )
      .subscribe(newValue => {
        this.selectProfile.emit(null);
        this.profiles = [];
        setTimeout(() => {
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
    this.userService.searchInternalProfiles({ name, size: 10, page: 0 })
      .subscribe(
        (response: RestResponse<Profile[]>) => {
          this.enableCustomLoading(false);
          if (response.output ) {
            this.profiles = response.output;
          }
        },
        err => {
          this.strenneService.getDefaultProfile()
          .subscribe(
            (response: RestResponse<Profile>) => {
              this.enableCustomLoading(false);
              if (response.output ) {
                this.profiles = [response.output];
              }
              this.enableCustomLoading(false);          
            });
        });
  }


  enableCustomLoading(loading: boolean): void {
    this.customLoading = loading;
  }

  displayFn(profile: Profile) {
    return profile ? profile.first_name + ' ' + profile.last_name : '';
  }

  onSelectionChange(selectionChange: MatAutocompleteSelectedEvent) {
    const selectedValue = selectionChange.option.value
    const selectedUser = {
      user_id: selectedValue.user_name,
      user_first_name: selectedValue.first_name,
      user_last_name: selectedValue.last_name,
      user_email: selectedValue.email
    };
    this.selectProfile.emit(selectedUser);
  }

  clearText(): void {
    this.formControl.reset();
    this.selectProfile.emit(null);
  }

  setValue(profile: Profile): void {
    this.formControl.setValue(profile);
    const event = {
      option: {
        value: profile
      }
    } as MatAutocompleteSelectedEvent;
    this.onSelectionChange(event);
    this.cdr.detectChanges();
  }

  initValue(profile: Profile): void {
    this.formControl.setValue(profile);
    this.cdr.detectChanges();
  }
}