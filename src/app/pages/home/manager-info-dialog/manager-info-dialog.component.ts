import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Profile} from '../../../shared/model/profile.model';

@Component({
  selector: 'app-manager-info-dialog',
  templateUrl: './manager-info-dialog.component.html',
  styleUrls: ['./manager-info-dialog.component.css']
})
export class ManagerInfoDialogComponent implements OnInit {
  buildingManager: Profile;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.buildingManager = this.dialogData?.buildingManager;
  }
}
