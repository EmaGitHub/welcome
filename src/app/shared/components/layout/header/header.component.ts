import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedLanguage = 'it';

  constructor(private translate: TranslateService) {
    const last = localStorage.getItem('selectedLang');
    if (last) {
      this.selectedLanguage = last;
    }
    translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {
  }

  changeLanguage() {
    localStorage.setItem('selectedLang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    window.location.reload();
  }

  goTo(url: string): void {
    window.open(url);
  }

}
