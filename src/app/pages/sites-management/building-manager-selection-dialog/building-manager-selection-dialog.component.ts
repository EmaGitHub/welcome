import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Profile} from '../../../shared/model/profile.model';

@Component({
  selector: 'app-building-manager-selection-dialog',
  templateUrl: './building-manager-selection-dialog.component.html',
  styleUrls: ['./building-manager-selection-dialog.component.css']
})
export class BuildingManagerSelectionDialogComponent implements OnInit {
  buildingManager: Profile;
  siteAddress: string;

  constructor(private dialogRef: MatDialogRef<BuildingManagerSelectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.buildingManager = this.dialogData?.buildingManager;
    this.siteAddress = this.dialogData?.siteAddress;
  }

  selectBuildingManager(profile: Profile): void {
    this.buildingManager = profile;
  }

  confirm(): void {
    this.dialogRef.close(this.buildingManager);
  }
}
