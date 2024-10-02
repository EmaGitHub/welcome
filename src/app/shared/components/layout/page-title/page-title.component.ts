import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utility } from 'src/app/shared/utils/utility';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit, AfterViewInit {
  @Input() customRouterLink: string;
  @Input() linkText: string;
  @Input() customTitle: string;
  @Input() subtitle: string;
  @Input() externalLink: string;
  @Input() externalLinkText: string;
  @Input() icon: string;
  @Input() href: string;
  @Input() customSubtitle: boolean;
  @Input() hideBackRouterLink: boolean;

  formattedSubtitle: string;


  constructor(
    private translate: TranslateService
  ) {
    this.linkText = "Home";
    this.customRouterLink = "/home"
  }

  ngOnInit(): void {
   }

  ngAfterViewInit() {
    if (this.customSubtitle) {
      this.subtitle = Utility.formatText(this.subtitle);
      this.formattedSubtitle = Utility.formatText(this.translate.instant(this.subtitle));
      document.getElementById("id-subtitle").innerHTML = Utility.formatText(this.translate.instant(this.subtitle));
    }
  }


}
