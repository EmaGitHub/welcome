import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  icon: string;
  title: string;
  text: string;
  textParams: any;
  value: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.icon = this.data.icon;
    this.title = this.data.title;
    this.text = this.data.text;
    this.textParams = this.data.textParams;
    this.value = this.data.value;
  }

  confirm() {
    this.dialogService.confirm.next(this.value);
  }

}
