import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../model/dialogData.model';
import { Utility } from '../../utils/utility';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {

  @Input() inputData: DialogData;
  @Input() helpSupport: boolean;
  title: string;
  contentText: string;
  icon: string;
  iconColor: string;
  btnLeft: string;
  btnRight: string;
  @Input() onBtnLeft: () => void;
  @Input() onBtnRight: () => void;

  constructor( @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, public dialog: MatDialog ,  private translate: TranslateService) { }

  ngOnInit(): void {
    const data = this.dialogData || this.inputData;
    if (data) {
      this.title = data.title;
      this.contentText = Utility.formatText( data.contentText);
      this.icon = data.icon;
      this.iconColor = data.iconColor;
      this.btnLeft = data.btnLeft;
      this.btnRight = data.btnRight;
      this.onBtnLeft = data.onBtnLeft;
      this.onBtnRight = data.onBtnRight;
    }

  }

  onClose(): void {}

  ngAfterViewInit() {
    if (this.contentText) {
      this.contentText = Utility.formatText(this.contentText);
      this.contentText = Utility.formatText(this.translate.instant(this.contentText));
      document.getElementById("dialog-text").innerHTML = Utility.formatText(this.translate.instant(this.contentText));
    }
  }


}