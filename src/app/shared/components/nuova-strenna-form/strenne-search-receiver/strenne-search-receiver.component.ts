import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { StrenneManagementService } from 'src/app/pages/strenne-management/strenne-management.service';
import { RestResponse } from 'src/app/shared/model/message';
import { Profile } from 'src/app/shared/model/profile.model';
import { StrenneProfile } from 'src/app/shared/model/strenneProfile.model';
import { SpinnerService } from '../../spinner';

@Component({
  selector: 'app-strenne-search-receiver',
  templateUrl: './strenne-search-receiver.component.html',
  styleUrls: ['./strenne-search-receiver.component.css']
})
export class StrenneSearchReceiverComponent implements OnInit {
  @Input() profile: StrenneProfile;
  @Output() selectProfile = new EventEmitter<any>();
  @Input() textLabel: string;
  formControl = new UntypedFormControl();
  formControlSub: Subscription;
  profiles: Profile[];
  customLoading = false;

  @Input() controlName: string;

  constructor(private strenneManagementService : StrenneManagementService, private spinnerService: SpinnerService) { }

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
    this.strenneManagementService.getRecipientByName(name)
      .subscribe(
        (response: RestResponse<StrenneProfile[]>) => {
          this.enableCustomLoading(false);
          if (response.output) {
            this.profiles = response.output;
          }
        },
        err => {
          this.enableCustomLoading(false);
          console.error('Profile Not Found!!', err);
        });
  }


  enableCustomLoading(loading: boolean): void {
    this.customLoading = loading;
  }

  displayFn(profile: StrenneProfile) {
    return profile ? profile.receiver_fullname : "";
  }

  onSelectionChange(selectionChange: MatAutocompleteSelectedEvent) {
    const selectedValue = selectionChange.option.value
    const selectedUser = {
      user_id: selectedValue.receiver_id,
      user_first_name: selectedValue.receiver_name,
      user_last_name: selectedValue.receiver_surname
    };
    this.selectProfile.emit(selectedUser);
  }

  clearText() : void{
    this.formControl.reset(); 
    this.selectProfile.emit(null);
  }
}