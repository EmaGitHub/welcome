import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../components/success-dialog/success-dialog.component';
import {Subject} from 'rxjs';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {ErrorDialogComponent} from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  confirm = new Subject();

  constructor(private dialog: MatDialog) {
  }

  openErrorDialog(text: string = 'error.generic', title: string = 'error.warning', icon: string = 'check_circle_outline') {
    if (this.dialog && (!this.dialog.getDialogById('error-dialog') || this.dialog.getDialogById('error-dialog').getState() !== 0)) {
      this.dialog.open(ErrorDialogComponent, {
        id: 'error-dialog',
        width: '400px',
        data: {
          icon,
          text,
          title
        }
      });
    }
  }

  openSuccessDialog(text: string = 'success.generic', icon: string = 'check_circle_outline') {
    return this.dialog.open(SuccessDialogComponent, {
      id: 'success-dialog',
      width: '400px',
      data: {
        icon,
        text
      }
    });
  }

  openConfirmDialog(text: string, textParams: any = {}, value: any, title: string = 'error.warning', icon: string = 'error_outline') {
    this.dialog.open(ConfirmDialogComponent, {
      id: 'confirm-dialog',
      width: '400px',
      data: {
        icon,
        title,
        text,
        textParams,
        value
      }
    });
  }

}
