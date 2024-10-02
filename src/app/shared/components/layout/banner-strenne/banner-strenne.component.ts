import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-banner-strenne',
  templateUrl: './banner-strenne.component.html',
  styleUrls: ['./banner-strenne.component.scss'],
})

export class BannerStrenneComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
