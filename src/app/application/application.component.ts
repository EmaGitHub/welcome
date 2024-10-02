import {Component, OnInit} from '@angular/core';
import {TabItem} from '../shared/model/tab-item.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

    selectedTabIndex = 0;

    user: string;
    tabElements: TabItem[] = [];

    constructor(private router: Router) {
    }

    setTabIndex(tabElement: TabItem) {
        this.router.navigate([tabElement.routerLink]);
        this.selectedTabIndex = this.tabElements.findIndex((tab: TabItem) => tab.label && tab.label === tabElement.label);
        console.log(this.selectedTabIndex);
    }

    ngOnInit(): void {
        this.tabElements = [
            { label: 'Front-end Profiler API', routerLink: '/application/feprofiler'},
            { label: 'ReplaceMe Business Service', routerLink: '/application/replaceme'}
        ];
        this.router.navigate([this.tabElements[0].routerLink]);
    }

}
