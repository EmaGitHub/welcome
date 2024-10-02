import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-services-attributes-management',
  templateUrl: './services-attributes-management.component.html',
  styleUrls: ['./services-attributes-management.component.css']
})
export class ServicesAttributesManagementComponent implements OnInit {

  selectedTab = 'category';

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(event: MatTabChangeEvent) {
    this.selectedTab = event.tab.content.viewContainerRef.element.nativeElement.id;
  }

}
