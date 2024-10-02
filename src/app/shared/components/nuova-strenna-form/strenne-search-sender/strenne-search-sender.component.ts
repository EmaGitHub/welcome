import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RestResponse } from 'src/app/shared/model/message';
import { Profile } from 'src/app/shared/model/profile.model';
import { SpinnerService } from '../../spinner';
import { StrenneManagementService } from 'src/app/pages/strenne-management/strenne-management.service';
import { StrenneProfile } from 'src/app/shared/model/strenneProfile.model';

@Component({
  selector: 'app-strenne-search-sender',
  templateUrl: './strenne-search-sender.component.html',
  styleUrls: ['./strenne-search-sender.component.css']
})
export class StrenneSearchSenderComponent implements OnInit {

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
    this.strenneManagementService.getSenderByName(name)
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
    return profile ? profile.sender : "";
  }

  onSelectionChange(selectionChange: MatAutocompleteSelectedEvent) {
    const selectedValue = selectionChange.option.value
    const selectedUser = {
      sender: selectedValue.sender,
      receiver_id :selectedValue.receiver_id
    };
    
    this.selectProfile.emit(selectedUser);
  }

  clearText() : void{
    this.formControl.reset(); 
    this.selectProfile.emit(null);
  }
}